function myFunction() {
  var x = document.getElementById("snackbar");

  x.className = "show";

  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}

let socket;
function setUpSocket() {
  socket = io.connect();

  socket.on("new-item", (data) => {
    console.log("NNNNNNNNNNnew item get!", data.fromSocketId);
    if (data.fromSocketId != socket.id) {
      myFunction();
    }
  });
}

setUpSocket();
