window.onload = (event) =>{
    toggleNotifi()
    toggleNotifi()
    logout()
    getMe()
    
}



let box = document.getElementById('box');
let down = false;

async function getMe() {
    let res = await fetch('/user/me')
    let data = await res.json()
    //console.log(data.data.user)
    
    console.log(window.location)
    //load the user container 
    //querySelector('.notifi-box').style.display = 'none'
    //document.querySelector('.notifi-item').style.display = 'none'
    if (res.ok) {
        let user = data.data.user 
        console.log(data.data.user)   
        if (window.location.href === "http://localhost:8080/index.html"){
        let plusItemBTNContainer = document.querySelector('.plusItemBTN')
        plusItemBTNContainer.style.display = 'flex'
    }
        let userFunctionBlock = document.querySelector('.display-user-function')
        userFunctionBlock.style.display = 'inline'

        let loginButtonContainer = document.querySelector('.display-login')
        loginButtonContainer.style.display = 'none'

        let logoutButtonContainer = document.querySelector('.display-logout')
        logoutButtonContainer.style.display = 'inline'
        let userContainerString = ""
        let userContainer = document.querySelector('.userContainer')
        userContainer.innerHTML = ""
        userContainerString = `<li class="iconNotifi" onclick="toggleNotifi()"><img src="assets/img/bell.png" alt=""><span>17</span></li><li><p>${user}</p></li><li><div class="user-btn"><p>${user.substring(0,1)}</p></div></li>`
                                    
        userContainer.style.display = 'flex'
        userContainer.innerHTML = userContainerString 
        // let imageTag = `
        // <img src="https://lh3.googleusercontent.com/a/AItbvmnvaOmlXDog6q_KIyN3qbH52ZipccLsZz4al8Gj=s96-c" alt=""
        // 			srcset="">
        // `
        // userContainer.innerHTML += imageTag

        //After loading the user container, load whether the notification exist or not
        notifiContent = await setUpNotification(user)
        contentLength = notifiContent.message.length
        //console.log(notifiContent)

        let notifiBox = document.querySelector('.notifi-box')
        let notifiIcon = document.querySelector('.iconNotifi')
        notifiIcon.innerHTML = '<img src="assets/img/bell.png" alt="">'
        notifiBox.innerHTML = ""
        if (notifiContent.message == "noNotification") {
            notifiBox.innerHTML = "<h2>No Recent notification&nbsp&nbsp<a href='notification.html'><span>see more...</span><a></h2>"
            return
        }
        notifiIcon.innerHTML += "<span>" + notifiContent.notifiNum + "</span>"
        notifiBox.innerHTML = "<h2>Recent " + notifiContent.notifiNum + " notification &nbsp&nbsp<a href='notification.html'><span>see more...</span><a></h2>"
        if (notifiContent.notifiNum > 5) {
            notifiBox.innerHTML = "<h2>Recent 5 notification &nbsp&nbsp<a href='notification.html'><span>see more...</span><a></h2>"
        }
        for (let runtime = 0; runtime < 5; runtime++) {
            if (!notifiContent.message[runtime]) {
                return
            }
            notifiBox.innerHTML += `
           <div class="notifi-item" ><a id="notifi-item-BTN" href='profile.html?sender_id=${notifiContent.id[runtime]}'>
           <div class="user-btn"><p>` + notifiContent.sender[runtime].substring(0,1) + `</p></div>
               <div class="text">
                  <h4>`+ notifiContent.message[runtime].split("_")[0] + `</h4>
                  <p>Click here to see the sender's profile</p>
               </div> 
               </a>
           </div>`
        }
        //check the userNotification
    }
}


//check the userNotification
//send the username to express then get the notification in sQL
async function setUpNotification(loginName) {
    const formObject = {}
    formObject['username'] = loginName
    //console.log(formObject)
    const res = await fetch('/user/notifications', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject),
    })
    const result = await res.json()
    //console.log(result)
    return result
}

async function logout() {
    const logoutFormElement = document.querySelector('#logout-button')
    logoutFormElement.addEventListener('click', async (event) => {
        console.log('clicked')
        let res = await fetch('/user/logout')
        if (res.ok) {
            let loginButtonContainer = document.querySelector('#login-page-button')
            loginButtonContainer.style.display = 'inline'

            let logoutButtonContainer = document.querySelector('#logout-button')
            logoutButtonContainer.style.display = 'none'

            let userContainer = document.querySelector('.userContainer-div')
            userContainer.style.display = 'none'
        } else {
            console.log("error!")
        }
    })
}



function toggleNotifi() {
    let notifiBox = document.querySelector('.notifi-box')
    notifiBox.style.display = 'none'
    if (down) {
        notifiBox.style.display = 'none'
        box.style.height = '0px';
        box.style.opacity = 0;
        down = false;
    } else {
        notifiBox.style.display = 'block'
        box.style.height = '-500px';
        box.style.opacity = 1;
        down = true;
    }
}

toggleNotifi()
toggleNotifi()
logout()
getMe()



