/**
* Template Name: EstateAgency - v4.8.0
* Template URL: https://bootstrapmade.com/real-estate-agency-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Toggle .navbar-reduce
   */
  let selectHNavbar = select('.navbar-default')
  if (selectHNavbar) {
    onscroll(document, () => {
      if (window.scrollY > 100) {
        selectHNavbar.classList.add('navbar-reduce')
        selectHNavbar.classList.remove('navbar-trans')
      } else {
        selectHNavbar.classList.remove('navbar-reduce')
        selectHNavbar.classList.add('navbar-trans')
      }
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Search window open/close
   */
  let body = select('body');
  on('click', '.navbar-toggle-box', function (e) {
    e.preventDefault()
    body.classList.add('box-collapse-open')
    body.classList.remove('box-collapse-closed')
  })

  on('click', '.close-box-collapse', function (e) {
    e.preventDefault()
    body.classList.remove('box-collapse-open')
    body.classList.add('box-collapse-closed')
  })


  /**
   * Intro Carousel
   */
  new Swiper('.intro-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Property carousel
   */
  new Swiper('#property-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.propery-carousel-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * News carousel
   */
  new Swiper('#news-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.news-carousel-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Testimonial carousel
   */
  new Swiper('#testimonial-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.testimonial-carousel-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Property Single carousel
   */
  new Swiper('#property-single-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.property-single-carousel-pagination',
      type: 'bullets',
      clickable: true
    }
  });

})()

//==========item search engine ==============
function concatValues(obj) {
  let value = '';
  for (let prop in obj) {
    value += obj[prop];
  }
  return value;
}
async function getAllItems() {
  let res = await fetch('/items')
  let items = await res.json()
  console.log(items)
  addItemsInDOM(items)
  // init Isotope
  $grid = null
  setTimeout(() => {
    setItemIsotope()
  },200);
}

function setItemIsotope() {
  let buttonFilters = {};
  let buttonFilter;
  let qsRegex;
  console.log('checking =', $('.lost-items-container'))
  $grid = $('.lost-items-container').isotope({
    itemSelector: '.item-wrapper',
    filter: function () {
      let $this = $(this);
      let searchResult = qsRegex ? $this.text().match(qsRegex) : true;
      let buttonResult = buttonFilter ? $this.is(buttonFilter) : true;
      return searchResult && buttonResult;
    },
  });

  $('.filters').on('click', '.button', function () {
    let $this = $(this);
    // get group key
    let $buttonGroup = $this.parents('.button-group');
    let filterGroup = $buttonGroup.attr('data-filter-group');
    // set filter for group
    buttonFilters[filterGroup] = $this.attr('data-filter');
    // combine filters
    buttonFilter = concatValues(buttonFilters);
    // Isotope arrange
    $grid.isotope();
  });

  $('.button-group').each( function( items, buttonGroup ) {
   
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', 'button', function() {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $( this ).addClass('is-checked');
      // searchFilter()
    
    });
  });
  

  function debounce(fn, threshold) {
    let timeout;
    threshold = threshold || 100;
    return function debounced() {
      clearTimeout(timeout);
      let args = arguments;
      let _this = this;
      function delayed() {
        fn.apply(_this, args);
      }
      timeout = setTimeout(delayed, threshold);
    };
  }

  let $quicksearch = $('.quicksearch').keyup(debounce(function () {
    searchItems()
    qsRegex = new RegExp($quicksearch.val(), 'gi');
    $grid.isotope();
  }));
}

//==========END item search engine ==============
let search = new URLSearchParams(window.location.search)
let itemId = search.get('itemId')
function addItemsInDOM(items) {
  let itemContainerElm = document.querySelector('.lost-items-container')
  itemContainerElm.innerHTML = ''

  for (let item of items) {
    let itemStatus = []
  let itemStatusInPage = "Pending"
  if (item.type == "found" || item.type == "Found"){
    itemStatus = ["Not returned", "Returned"]
  }
  if (item.type == "lost" || item.type == "Lost" ){
    itemStatus = ["Not found", "Found"]
  }
  if (item.status == "true"){
  itemStatusInPage = itemStatus[1]
  }else{
  itemStatusInPage = itemStatus[0]
  }

    itemContainerElm.innerHTML +=  /*HTML */`
      <div class="col-md-4 item-wrapper ${item.type}">
            <div class="card-box-a card-shadow">
              <div class="img-box-a">
                <img
                  src="/${item.image}"
                  alt="" class="img-a img-fluid">
              </div>
              <div class="card-overlay">
                <div class="card-overlay-a-content">
                  <div class="card-header-a">
                    <h2 class="card-title-a">
                      <a href="#">${item.name}

                    </h2>
                  </div>
                  <div class="card-body-a">
                    <div class="price-box d-flex">
                    ${item.is_free ? ' <span class="price-a">FREE</span> ' : '<span class="price-a">Need Fee</span> '}
                     
                    </div>
                    <a href="/item-single.html?itemId=${item.id}" class="link-a">Click here to view
                      <span class="bi bi-chevron-right"></span>
                    </a>
                  </div>
                  <div class="card-footer-a">
                    <ul class="card-info d-flex justify-content-around">
                  
                      <li>
                        <h4 class="card-info-title">Category</h4>
                        <span>${item.category}</span>
                      </li>
                      <li>
                        <h4 class="card-info-title">Date</h4>
                        <span>${item.happened_at.substring(0,10)}</span>
                      </li>
                      <li>
                        <h4 class="card-info-title">Status</h4>
                        <span>${itemStatusInPage}</span>
                        
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
      `

  }

}

//https://cdn.shopify.com/s/files/1/0554/0787/0011/products/A1_5202e923-0064-45ca-ba20-9465209386a0_grande.jpg?v=1643718446
getAllItems()



//============================navbar====================
// const dropdownBtn = document.querySelector("#navbarDefault > ul.navbar-nav > li.nav-item.dropdown")
// dropdownBtn.style.display="none";


//===========================card-body location
//    <li>
// <h4 class="card-info-title">Location</h4>
// <span>${item.location}

// </span>
// </li>

