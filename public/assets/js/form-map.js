async function initialize() {
  initMap();
  initMap2();
}

// let reportBtn =
//   '<button class="button form-control"  style="margin:8px 0 8px 0";>REPORT</button>';
// let itemDetail = `<input type=button onClick="
// parent.location='http://localhost:8080/item-single.html'" 
// class="form-control"
// value='DETAIL'>`;
//-------------------google map api--------------------------
// let map;
let currentPosition;
let selectedTypes;
let marker;

let infoWindow;

let geocoder;

  function initMap() {
    const map = new google.maps.Map(document.getElementById("map-form"), {
      center: { lat: 22.39, lng: 114.16 },
      zoom: 12,
    });

    navigator.geolocation.getCurrentPosition(function (position) {
      currentPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      map.setCenter(currentPosition);
      map.setZoom(16);

      const options = {
        componentRestrictions: { country: "hk" },
        // fields: ["address_components", "geometry", "icon", "name"],
        // types: ['restaurant'],
        bounds: {
          east: currentPosition.lng + 0.001,
          west: currentPosition.lng - 0.001,
          south: currentPosition.lat - 0.001,
          north: currentPosition.lat + 0.001,
        },
        strictBounds: false,
      };

      const autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("search-input-form"),
        options
      );

      autocomplete.addListener("place_changed", function () {
        const place = autocomplete.getPlace();

        selectedTypes = {
          location: place.geometry.location,
          placeId: place.place_id,
          name: place.name,
          address: place.formatted_address,
          phoneNumber: place.formatted_phone_number,
          rating: place.rating,
        };

        //move to search location
        map.setCenter(selectedTypes.location);
        //new marker create obj
        if (!marker) {
          marker = new google.maps.Marker({
            map: map,
          });
        }

        marker.setPosition(selectedTypes.location);
      }); 
    });
  }


//======================================================================================================
//======================================================================================================
//======================================================================================================
//======================================================================================================

// let mapName = `<div style="font-size:1.2rem;text-align:center;display:block; font-weight: 700;">iPhone 14 Pro Max</div>`;
// let mapImage = `<img src="/assets/img/1.jpg" alt="item-image" style="max-width:100%; height:auto;" class="img-fluid"/>`;
// let reportBtn =
//   '<button class="button form-control"  style="margin:8px 0 8px 0";>REPORT</button>';
// let itemDetail = `<input type=button onClick="
// parent.location='http://localhost:8080/item-single.html'" 
// class="form-control"
// value='DETAIL'>`;

let mainMap




  

async function clickOnReport(id){
  let res = await fetch('/user/me')
  if (!res.ok){
    alert('Please Login first !')
    return

  }else{
     alert('Reported. Receiver will contact you soon')



  }
}








async function updateMapMarker(items) {


  for (let item of items){
    
    let contentString = /*HTML*/`
    <div style="font-size:1.2rem;text-align:center;display:block; font-weight: 700; margin-bottom:0.5rem;">${item.name}</div>
    <img src="/${item.image}" alt="item-image" style="max-width:100%; height:auto;" class="img-fluid"/>


   
     <button onclick="clickOnReport('${item.id}')" class="button form-control"  style="margin:8px 0 8px 0";>REPORT</button>

  <input type=button onClick="
    parent.location='http://localhost:8080/item-single.html?itemId=${item.id}'" 
    class="item-detail form-control"
    value='DETAIL'>


    
    `
    // INFO　WINDOW
    let infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 200,
    });


    // (22.26243482172202, 114.20025642097168)
    
    // // MARKER
    // let randomLat = 22.26243482172202;
    // let randomLng = 114.20025642097168;


    let locationData2 = await getLatLng2(item.location)
// let locationData2LatLng //================================

    // let randoNum = Math.random() * 0.01;
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(
        locationData2.lat,
        locationData2.lng
        //=======================================呢到可以刪
      ),

     
      map: mainMap,
    });
let markers=[]

markers.push(marker)
// marker[i].setMap(mainMap);
console.log(markers)
    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map: mainMap,
        shouldFocus: false,
      });
    });

    google.maps.event.addDomListener(mainMap, "click", () => {
      infowindow.close()
    });

const clearBtn = document.querySelector('.btn-clear')
clearBtn.addEventListener('click',()=>{
  marker.setMap(null);
})
  
  }

};


async function searchItems(){
  let userSearchInput = document.querySelector("#search-input").value
  if (!userSearchInput){
    return
  }
 let res = await fetch(`/items/search?keyword=${userSearchInput}`)
 let items = await res.json()
 console.table(items)

 updateMapMarker(items)

}


//==================================================================================
// async function searchFilter(){

// let allIschecked = document.querySelector('.all-item')

// allIschecked.matches('.is-checked')


// updateMapMarker(items)
// }


function initMap2() {
  mainMap = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(22.26243482172202, 114.20025642097168),
    zoom: 11,

  
    // searchItems()


    
  }
  )
  
  
  
  
  ;

}

async function getLatLng2(address) {
  return new Promise(async (resolve, reject) => {
    // const address = "111 Wellington St, Ottawa, ON K1A 0A9, Canada";
    try {
      let res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBuMGjgQmqxi_aIZRPyvPgAaKI3-yPtNeI`
      );
      let jsonData2 = await res.json();

      resolve(jsonData2.results[0].geometry.location);
    } catch (error) {
      reject(error)
    }
   
  });
}

// setMapOnAll(mainMap)