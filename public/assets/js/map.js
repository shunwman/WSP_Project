


// let mapName = `<div style="font-size:2rem;text-align:center;">IPHONE 14</div>`
// let mapImage = `<img src="/assets/img/1.jpg" alt="item-image" style="width:200px; height:auto;" class="img-fluid"/>`
// let reportBtn = '<button class="button form-control"  style="margin:8px 0 8px 0";>REPORT</button>'



// let itemDetail = `<input type=button onClick="
// parent.location='http://localhost:8080/item-single.html'" 
// class="form-control"
// value='DETAIL'>`

// async function getAllItems() {
//   let res = await fetch('/items')
//   let items = await res.json()
//   console.log(items)

//   // init Isotope

// }
//-----------------------END:SQL DATA------------------

//-------------------google map api--------------------------

// let marker;

//data from SQL item form
let map;
let itemLat = 22.28738391276329;
let itemIng = 114.14825358308477;

// function initMap() {
//   const itemLocation = { lat: itemLat, lng: itemIng };
//   map = new google.maps.Map(
//     document.getElementById("map-single"),
//     {
//       zoom: 17,
//       center: itemLocation,
//     }
//   );

// // function getAllItems(items){
// //   for(let item of items){
// //  contentString = 
// //     `
// //   <div style="font-size:2rem;text-align:center;">${item.name}</div>
// //   <img src="/assets/img/${item.image}" alt="item-image" style="width:200px; height:auto;" class="img-fluid"/>

// // `

// // }
// // reportBtn
// // itemDetail
//   const infowindow = new google.maps.InfoWindow({
//     content: contentString,
//     // maxWidth: AudioContext,
//   });

//   const marker = new google.maps.Marker({
//     position: itemLocation,
//     map,
//     title: "Item Location",
//   });

//   marker.addListener("click", () => {
//     infowindow.open({
//       anchor: marker,
//       map,
//       shouldFocus: false,
//     });
//   });


// // auto show infowindow

//   infowindow.open({
//     anchor: marker,
//     map,
//     shouldFocus: false,
//   });



// }




// async function init() {
//  getAllItems()
//   initMap()
// }

// init()
