// const address = "111 Wellington St, Ottawa, ON K1A 0A9, Canada";
// itemname =     <div style="font-size:1.2rem;text-align:center;display:block; font-weight: 700;">${items.name}</div>
// let mapName = `<div style="font-size:1.2rem;text-align:center;display:block; font-weight: 700;">iPhone 14 Pro Max</div>`;
// let mapImage = `<img src="/assets/img/1.jpg" alt="item-image" style="max-width:100%; height:auto;" class="img-fluid"/>`;
// let reportBtn =
//   '<button class="button form-control"  style="margin:8px 0 8px 0";>REPORT</button>';
// let itemDetail = `<input type=button onClick="
//   parent.location='http://localhost:8080/item-single.html'" 
//   class="form-control"
//   value='DETAIL'>`;

// let updateMapMarkerOutter;
// const contentString = `
//   ${mapName}
//   ${mapImage}
//   `;
let mainMap;
//   function updateMapMarker(items) {

//     for (let item of items){

//       let contentString = /*HTML*/`

//       <div style="font-size:1.2rem;text-align:center;display:block; font-weight: 700;">${item.name}</div>

//       <img src="/${item.image}" alt="item-image" style="max-width:100%; height:auto;" class="img-fluid"/>

//       `;
//       // INFO　WINDOW
//       let infowindow = new google.maps.InfoWindow({
//         content: contentString,
//         maxWidth: 200,
//       });

//       // MARKER
//       let randomLat = -33.91721;
//       let randomLng = 151.2263;
//       let randoNum = Math.random() * 0.01;
//       const marker = new google.maps.Marker({
//         position: new google.maps.LatLng(
//           randomLat  + randoNum,
//           randomLng  + randoNum
//           //=======================================呢到可以刪
//         ),

//         map: mainMap,
//       });

//       marker.addListener("click", () => {
//         infowindow.open({
//           anchor: marker,
//           map: mainMap,
//           shouldFocus: false,
//         });
//       });

//     }

//   };


// async function clickOnReport2(name){
//   let res = await fetch('/user/me')
//   if (!res.ok){
//     alert('Please Login first !')
//     return

//   }else{
//      alert('Reported. Receiver will contact you soon')

  
//   }
// }


async function updateMapMarker2(items) {
  // geocoder = new google.maps.Geocoder();

  // console.log("succuess update map :" + getLocation(items));

  // geocoder.geocode(
  //   {
  //     address: address,
  //   },
  //   (results, status) => {
  //     if (status == google.maps.GeocoderStatus.OK) {
  //       console.log(results[0].geometry.location.lat());
  //       console.log(results[0].geometry.location.lng());
  //     } else {
  //       alert("Geocode was not successful for the following reason: " + status);
  //     }
  //   }
  // );

  console.log("successful");
  // for (let item of items) {

  //=============================
  let contentString = /*HTML*/ `
        
      
  <div style="font-size:1.2rem;text-align:center;display:block; font-weight: 700; margin-bottom:0.5rem;">${items.name}</div>
  <img src="/${items.image}" alt="item-image" style="max-width:100%; height:auto;" class="img-fluid"/>`


 
//   <button onclick="clickOnReport2('${items.id}')" class="button form-control"  style="margin:8px 0 8px 0";>REPORT</button>

// <input type=button onClick="
//   parent.location='http://localhost:8080/item-single.html?itemId=${items.id}'" 
//   class="item-detail form-control"
//   value='DETAIL'>



          
  // INFO　WINDOW
  let infowindow = new google.maps.InfoWindow({
    content: contentString,
    maxWidth: 200,
  });

  // MARKER
  //   let randomLat = -33.91721;
  //   let randomLng = 151.2263;
  //   let randoNum = Math.random() * 0.01;
  let locationData = await getLatLng(items.location)
  const marker = new google.maps.Marker({
    position: new google.maps.LatLng(
      locationData.lat,
      locationData.lng
    ),

    map: mainMap,
    
  });
  mainMap.setCenter(locationData);
  mainMap.setZoom(18);

    infowindow.open({
      anchor: marker,
      map: mainMap,
      shouldFocus: false,
      
    });

    google.maps.event.addDomListener(mainMap, "click", () => {
      infowindow.close()
    });
    marker.addListener("click", () => {
      infowindow.open({
        anchor: marker,
        map: mainMap,
        shouldFocus: false,
      });
    });
 
  
}
// }    //=====================for loop

// function getItemIdInQuery() {
//     let search = new URLSearchParams(window.location.search)
//     let itemId = search.get('itemId')
//     if (!itemId) {
//       window.location.href = '/'
//     }
//     return itemId
//   }

async function getLocation() {
  let itemId = getItemIdInQuery();
  if (!itemId) {
    window.location.href = "/";
  }
  console.log("itemLocation=", itemId);
  const res = await fetch(`/items/item-single-map/${itemId}`);
  let items = await res.json();
  // .then(function(data){
  //    return data.location

  //   });
  // let itemLocation = items.location
  // console.log(`"123:" ${itemLocation}`);

  updateMapMarker2(items);
}

//   async function searchItems2(){
//     let userSearchInput = document.querySelector(".get-location").innerHTML
//     console.log(userSearchInput);
//     if (!userSearchInput){
//       return
//     }

//    let res = await fetch(`/items/search?keyword=${userSearchInput}`)
//    let items = await res.json()
//    console.table(items)
//    updateMapMarker2(items)
// //    updateMapMarker(items)  //----------------------------------------------------------呢到同FORM有關 要放返岩個ITEMS

//   }

function initMap3() {
  mainMap = new google.maps.Map(document.getElementById("map-single"), {
    center: new google.maps.LatLng(-33.91722, 151.23064),
    zoom: 16,
  });
  console.log('init map 3')

  // map.setCenter(locationData);
  // map.setZoom(16);



  getLocation()


}

async function getLatLng(address) {
  return new Promise(async (resolve, reject) => {
    // const address = "111 Wellington St, Ottawa, ON K1A 0A9, Canada";
    try {
      let res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBuMGjgQmqxi_aIZRPyvPgAaKI3-yPtNeI`
      );
      let jsonData = await res.json();
  
      resolve(jsonData.results[0].geometry.location);
    } catch (error) {
      reject(error)
    }
   
  });
}

async function initialize2() {
  console.log('called initialize2');
  initMap3();
}

// const address = "111 Wellington St, Ottawa, ON K1A 0A9, Canada";



// google.maps.event.addDomListener(map, "click", () => {
//   infowindow.close()
// });