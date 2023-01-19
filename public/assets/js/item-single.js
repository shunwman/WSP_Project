let preloader = document.querySelector('#preloader');
const alert = document.querySelector(".property-agent")

if (preloader) {
  window.addEventListener('load', () => {
    preloader.remove()
  });
}





function getItemIdInQuery() {
  let search = new URLSearchParams(window.location.search)
  let itemId = search.get('itemId')
  if (!itemId) {
    window.location.href = '/'
  }
  return itemId
}

async function getOwner(userId) {
  const res = await fetch(`/user/user/${userId}`)
  if (res.ok) {
    let data = await res.json()
    return data.data
  } else {
    return null
  }

}

async function getItem() {
  let itemId = getItemIdInQuery()
  if (!itemId) {
    window.location.href = '/'
  }
  console.log('itemID=', itemId)
  const res = await fetch(`/items/item-single/${itemId}`)
  let itemDetails = await res.json()
  console.log(itemDetails)
  addItemInPage1(itemDetails)
  addItemInPage2(itemDetails)
  addItemInPage3(itemDetails)

  console.log("itemDetails is " + itemDetails);


  return itemDetails
}

function addItemInPage1(item) {
  let itemContainer = document.querySelector('.item-description1');

  itemContainer.innerHTML = ''

  itemContainer.innerHTML +=
    `

<section class="intro-single">
  <div class="container">
    <div class="row">
      <div class="col-md-12 col-lg-8">
        <div class="title-single-box">
          <h1 class="title-single" data-index = "${item.id}>${item.name}</h1>
          <span class="color-text-a">${item.type}</span>
        </div>
      </div>
      <div class="col-md-12 col-lg-4">
        <nav aria-label="breadcrumb" class="breadcrumb-box d-flex justify-content-lg-end">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="index.html">Home</a>
            </li>
            <li class="breadcrumb-item">
              <a href="items-grid.html">Posts</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
            ${item.name}
            </li>
          </ol>
        </nav>
      </div>
    </div>
  </div>
</section>`

















}

function addItemInPage2(item) {
  let itemContainer = document.querySelector('.item-description2');

  itemContainer.innerHTML = ''

  itemContainer.innerHTML +=

  `<div class="row justify-content-center">
    <div class="col-lg-8">
      <div id="property-single-carousel" class="swiper">
        <div class="swiper-wrapper justify-content-center">
        <div class="testing-section justify-content-center">
          <div class="carousel-item-b swiper-slide">
            <img
              src="/${item.image}"
              alt="">
          </div>    
       
         </div>      
        
         
    </div>
  </div>`
}

function addItemInPage3(item) {
    let itemContainer = document.querySelector('.item-description3');
    let category =['Electronic products','Pets','Bags','Clothes','Books','Accessories','Other']
    let itemProperty = "Free"
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
  if (! item.isFree){itemProperty = "Reward"}
    itemContainer.innerHTML = ''

  itemContainer.innerHTML += /*html*/ `
  </div><div class="title-box-d">  
           <h3 class="title-d">Item Description</h3> 
           <div class="property-description">
          
        
        </div>
        
        </div>
        <p class="description color-text-a">
            ${item.description}
        </p>  
            
      </div>  
  <form class="single-item-edit-form">
  <textarea cols="50" type="text" name="description" minlength="" maxlength="1000" 
      class="item-single-input textBoxInput"></textarea>    
  <div class="input-btn"><input type="file" name="image_input" class="item-single-input"/></div>
  <div class="property-single-carousel-pagination carousel-pagination"></div>
        <div class="col-sm-12">
    <div class="row justify-content-between">
      <div class="col-sm-12">
        <div class="property-summary">
          <div class="row">
            <div class="col-sm-12">
              <div class="title-box-d section-t4">
                <h3 class="title-d">Quick Summary</h3>
                
                <input type="submit" value="Save" class="save-submit-item input-btn"/>
                <input type="reset" value="Cancel" class="cancel-reset-item input-btn"/>
              </div>
            </div>
          </div>
          <div class="summary-list">
            <ul class="list">
              <li class="d-flex justify-content-between">
                <strong>Name:</strong>
                
                <span>${item.name}</span>
              </li>
              <li class="d-flex justify-content-end">
                <input type="text" name="name" class="item-single-input edit-input">
                
              </li>
              <li class="d-flex justify-content-between">
                <strong>Item Type:</strong>
                <span>${item.type}</span>
              </li>
              <li class="d-flex justify-content-end">
                <select class="item-single-input edit-input" name="type" id="Type" required>
                <option value="lost">Lost</option>
                <option value="found">Found</option>
              </select>

              </li>
              <li class="d-flex justify-content-between">
                <strong>Category:</strong>
                
                <span>${category[item.category_id-1]}</span>
              </li>
              <li class="d-flex justify-content-end">
                <select class="item-single-input edit-input" name="category_id" id="Type" required>
                <option value="1">Electronic Products</option>
                <option value="2">Pets</option>
                <option value="3">Bags</option>
                <option value="4">Clothes</option>
                <option value="5">Books</option>
                <option value="6">Accessories</option>
                <option value="7">Other</option>
              </select>
              </li>
              </li>
              <li class="d-flex justify-content-between">
                <strong>Location:</strong>
                <span>${item.location}</span>
              </li>
              <li class="d-flex justify-content-end">
                <input type="text" name="location_name" class="item-single-input edit-input">
              </li>
              <li class="d-flex justify-content-between">
                <strong>Date:</strong>
                <span>${item.happened_at.substring(0,10)}</span>
              </li>
              <li class="d-flex justify-content-end">
                <input type="datetime-local" id="meeting-time" name="happened_at" value="2022-09-19T12:30"
                min="2020-01-01T00:00" max="2022-09-22T00:00" class="item-single-input edit-input">
              </li>
              <li class="d-flex justify-content-between">
                <strong>Status:</strong>
                <span>${itemStatusInPage}</span>
              <li class="d-flex justify-content-end">
                <select class="item-single-input edit-input" name="status" id="status" required>
                <option value="true">${itemStatus[1]}</option>
                <option value="false">${itemStatus[0]}</option>
              </li>
               
              </select>

              </li>
              <li class="d-flex justify-content-between">
                <strong>Free or not:</strong> 
                <span>${itemProperty}</span>
              </li>
              <li class="d-flex justify-content-end">
                <select class="item-single-input edit-input" name="isFree" id="type" required>
                <option value="true">Free</option>
                <option value="false">Reward</option>
              </select>
              </li>
            </ul>
          </form>
          </div>
        </div>
      </div>
      
    </div>
  </div>`

}

async function updateContactOwnerForm(owner) {
    let res = await fetch('/user/me')
    let data = await res.json()
    let user 
    if(res.ok){
    user = data.data.userData['id']
    }
    console.log("user:" + user)
    let itemContainer = document.querySelector('.owner-description');
    let innerHTMLstring = ''
    itemContainer.innerHTML = ''
    innerHTMLstring += `
        <div class="col-md-12">
        <div class="row section-t3">
            <div class="col-sm-12">
                <div class="title-box-d">`
                    
                    if (res.ok) {
                      if (data.data.userData['id'] == owner.id){
                        innerHTMLstring +=
                      `<h3 class="title-d">Your Information</h3>`
                      let btnContainer = document.querySelector('.section-t4')
                      btnContainer.innerHTML += `<button type="button" class="edit-mode-btn input-btn">Edit My Post</button>`
                      }else{
                        innerHTMLstring +=
                      `<h3 class="title-d">Contact Owner</h3>`
                      }
                    }else{
                      innerHTMLstring +=
                    `<h3 class="title-d">Contact Owner</h3>`
                    }
                    innerHTMLstring +=
                `</div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-lg-4">
            <div class="user-btn-in-profile">
            ${owner.image ? `<img src="/${owner.image}" alt="Image" class="profile-img"/>` : '<p>'+owner.username.substring(0,1)+'</p>'}
            
            </div>
            </div>
            <div class="col-md-6 col-lg-4">
                <div class="property-agent">
                    <h4 class="title-agent">${owner.username}</h4>
                    <ul class="list-unstyled">
                        <li class="d-flex justify-content-between">
                            <strong>Phone:</strong>
                            <span class="color-text-a">${owner.phone_number}</span>
                        </li>
                        <li class="d-flex justify-content-between">
                            <strong>Whatsapp:</strong>
                            <span class="color-text-a">${owner.phone_number}</span>
                        </li>
                        <li class="d-flex justify-content-between">
                            <strong>Email:</strong>
                            <span class="color-text-a">${owner.email}</span>
                        </li>
                    </ul>
                    <div class="socials-a">
                        <ul class="list-inline">
                            <li class="list-inline-item">
                                <a href="#">
                                    <i class="bi bi-facebook" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li class="list-inline-item">
                                <a href="#">
                                    <i class="bi bi-twitter" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li class="list-inline-item">
                                <a href="#">
                                    <i class="bi bi-instagram" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li class="list-inline-item">
                                <a href="#">
                                    <i class="bi bi-linkedin" aria-hidden="true"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-12 col-lg-4">
                  <div class="property-contact">`
                   
                        
    if (res.ok) 
    {console.log("ok")
      if (data.data.userData['id'] == owner.id){
    }else{
      innerHTMLstring +=
                          `<form class="form-notifications-to-other">
                            <div class="row">
                            <div class="col-md-12 mb-1">
                          <div class="form-group">
                          <form class="form-notifications-to-other02">
                            <textarea id="textMessage" class="form-control" type= "text" placeholder="Comment *" name="message"
                              cols="45" rows="8" required></textarea>
                          </div>
                        </div>
                        <div class="col-md-12 mt-3">
                          <button type="submit" class="btn btn-a" id="messageBtn" receiver_id="${owner.id}">Send Message</button>
                          </form>
                          </div>
                        </div>
                        </form>`
                    }
    }
    innerHTMLstring +=
                      
                  `</div>
                </div>
            </div>`

    itemContainer.innerHTML = innerHTMLstring
    if (res.ok) {
      if (data.data.userData['id'] == owner.id){
        //set the edit button to the html
        setEditMode()
        setCancel()
        editTheItem()
    }
    }
    // getLatLng(itemLocation)

}

function setEditMode(){
  const editModeBtn = document.querySelector('.edit-mode-btn')
  editModeBtn.addEventListener('click', async (event) =>{
      let editItemInputs = document.querySelectorAll('.item-single-input')
      let saveSubmitBTN = document.querySelector('.save-submit-item')
      let cancelResetBTN = document.querySelector('.cancel-reset-item')
      console.log(editItemInputs )
      for (let editItemInput of editItemInputs ){
        editItemInput.style.display  = "flex"
        saveSubmitBTN.style.display  = "inline"
        cancelResetBTN.style.display  = "inline"
      }
      editModeBtn.style.display = "none"
  })
}

function setCancel(){
  const editModeBtn = document.querySelector('.edit-mode-btn') 
  const cancelResetBTN = document.querySelector('.cancel-reset-item')
  cancelResetBTN.addEventListener('click', async (event) =>{
    let editItemInputs = document.querySelectorAll('.item-single-input')
    let saveSubmitBTN = document.querySelector('.save-submit-item')
   
      for (let editItemInput of editItemInputs){
        editItemInput.style.display  = "none"
      }
      saveSubmitBTN.style.display  = "none"
      cancelResetBTN.style.display  = "none"
      editModeBtn.style.display = "inline"
  })
}

async function editTheItem(){
  const itemFormElements = document.querySelector('.single-item-edit-form')
  console.log(itemFormElements)
  itemFormElements.addEventListener('submit', async (e) => {
    
  e.preventDefault()  
      
  const form = e.target
  const formData = new FormData()
      const file = form.image_input.files[0]
      formData.append('name', form.name.value)
      formData.append('type', form.type.value)
      formData.append('category_id', form.category_id.value)
      formData.append('description', form.description.value)
      formData.append('location', form.location_name.value)
      formData.append('happened_at', form.happened_at.value)
      formData.append('status', form.status.value)
      formData.append('isFree', form.isFree.value)
      formData.append('id', getItemIdInQuery())
      formData.append('image', file)
      console.log(formData)
      const res = await fetch('/user/profile/items/formidable', {
    method: 'POST',
    body: formData
  })
      if (res.ok) {
          form.reset()
          location.reload();
  }else{
          form.reset()
          window.alert("Error! The input of email, username or phone may be existed")
      }
  }
)} 



async function reportItems(itemType, itemId) {
    const submitBtn = document.querySelector('#messageBtn')
    console.log(submitBtn.getAttribute('receiver_id'))
    const receiver_id = submitBtn.getAttribute('receiver_id')
    console.log(itemId)
    console.log(itemType)
    console.log(receiver_id)
    console.log(submitBtn.innerHTML)
    const reportItemsElement = document.querySelector('.form-notifications-to-other')
    console.log(reportItemsElement.innerHTML)
    reportItemsElement.addEventListener('submit', async (event) => {
        event.preventDefault()
        // Serialize the Form afterwards
        const form = event.target
        const formObject = {}
        formObject['message'] = form.message.value
        formObject['item_id'] = itemId
        formObject['receiver_id'] = receiver_id
        formObject['type'] = itemType
        console.log(formObject);
        const res = await fetch('/user/notifi', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formObject),
        })
        const result = await res.json()
        if (res.ok) {

            window.alert("Message sended!");
            form.reset()
        }
        if (!res.ok) {
            window.alert("Error! Please check login or not")
        }
    })
    
  }


//================================google map=======================================

// async function getAllItems() {
//   let res = await fetch('/items')
//   let items = await res.json()
//   console.log(items)

//   // init Isotope
// }
// try {
//   let map;
//   let itemLat = 22.28738391276329;
//   let itemIng = 114.14825358308477;

//   function initMap() {
//     const itemLocation = { lat: itemLat, lng: itemIng };
//     map = new google.maps.Map(
//       document.getElementById("map-single"),
//       {
//         zoom: 17,
//         center: itemLocation,
//       }
//     );


//     contentString =
//       `
//   <div style="font-size:2rem;text-align:center;">${item.name}</div>
//   <img src="/assets/img/${item.image}" alt="item-image" style="width:200px; height:auto;" class="img-fluid"/>

// `
//     // reportBtn
//     // itemDetail
//     const infowindow = new google.maps.InfoWindow({
//       content: contentString,
//       // maxWidth: AudioContext,
//     });

//     const marker = new google.maps.Marker({
//       position: itemLocation,
//       map,
//       title: "Item Location",
//     });

//     marker.addListener("click", () => {
//       infowindow.open({
//         anchor: marker,
//         map,
//         shouldFocus: false,
//       });
//     });


//     // auto show infowindow

//     infowindow.open({
//       anchor: marker,
//       map,
//       shouldFocus: false,
//     });



//   }
// } catch (error) {
//   console.log('google map error')
// }


async function init() {
  let res = await fetch('/user/me')
    let data = await res.json()
    console.log(data)
    
    
    let itemDetails = await getItem()
    let owner = await getOwner(itemDetails.created_by)
    await updateContactOwnerForm(owner)
    if (res.ok){
      let user = data.data.user
    if(!(data.data.userData['id'] == owner.id)){
    await reportItems(itemDetails.type, itemDetails.id)
    }
    if ((data.data.userData['id'] == owner.id)){
    }
    }


 
    
    //notifyBtn.addEventListener("submit", reportItems)

}

init()


