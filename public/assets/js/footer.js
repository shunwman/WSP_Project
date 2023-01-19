

function addFooterIn() {
    let footer = document.querySelector('.addFooter')
    footer.innerHTML = ''

    footer.innerHTML =  /*html*/
        `
        <section class="section-footer">
  <div class="container">
    <div class="row">
      <div class="col-sm-12 ">
        <div class="widget-a">
          <div class="w-header-a">
            <h3 class="w-title-a text-brand">LostFound</h3>
          </div>
          <div class="w-body-a">
            <p class="w-text-a color-text-a">
              We are a platform for posting lost and found items in Hong Kong.
            </p>
          </div>
          <div class="w-footer-a">
            <ul class="list-unstyled">
              <li class="color-a">
                <span class="color-text-a">Email .</span> lostfound@tecky.io
              </li>
              <li class="color-a">
                <span class="color-text-a">Phone .</span> +852 2319 3829
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  </div>
</>
<footer>
  <div class="container">
    <div class="row">
      <div class="col-md-12">

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
  </div>
`

}


addFooterIn()