let socket;
const itemListFormElement = document.querySelector(".item-wall-form");

function myFunction(item) {
  var x = document.getElementById("snackbar");
  x.innerHTML = "";
  x.innerHTML += /*HTML */ `Someone found an item!<a href="/item-single.html?itemId=${item.id}" class="alert-link">Click here for more information!</a>`;
  // "/item-single.html?itemId=${item.id}""
  x.className = "show";

  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 10000);
}

function setUpSocket() {
  socket = io.connect();
  socket.on("new-item", (data) => {
    console.log("NNNNNNNNN");
    if (data.fromSocketId != socket.id) {
      myFunction(data.items);
    }
  });
}

async function createItems(e) {
  e.preventDefault();
  console.log("socket id to form", socket.id);
  const formData = new FormData(itemListFormElement);

  formData.append("fromSocketId", socket.id);

  const res = await fetch("/items/formidable", {
    method: "POST",
    body: formData,
  });

  if (res.ok) {
    itemListFormElement.reset();
    // form.reset()
    let body = document.querySelector("body");
    console.log("body", body);
    body.classList.remove("box-collapse-open");
    body.classList.add("box-collapse-closed");
    window.location.reload()
  }
}

async function init() {
  setUpSocket();
  itemListFormElement.addEventListener("submit", createItems);
}
init();
