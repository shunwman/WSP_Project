async function setUpNotificationPage(loginName) {
    const formObject = {}
    formObject['username'] = loginName
    console.log(formObject)
    const res = await fetch('/user/notifications', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formObject),
    })
    const result = await res.json()
    console.log(result)
    let innerHTMLstring = ""
    let notifiSection = document.querySelector('.notification-section')
    innerHTMLstring  = '<div class="notification-header"><h1 >Notification</h1></div>'
    contentLength = result.message.length
    if (result.message == "noNotification") {
        innerHTMLstring += `<div class="notification-message-items">
        <h5>No recent notification<h5>
    </div>`
    notifiSection.innerHTML = innerHTMLstring 
    return
    }
    for (let runtime = 0; runtime < contentLength; runtime++){
        innerHTMLstring  += `<div class="notification-message-items">
            <h5 class="user-message-status">`+result.message[runtime].split('_')[0]+`<h5>`
            innerHTMLstring  +=
            result.message[runtime].split('_')[1] ? `<p class="user-notification-message">Message: ${result.message[runtime].split('_')[1]}</p>`  : '' 
            innerHTMLstring  +=    
            `<div class="down-bar">
            <a href="item-single.html?itemId=${result.itemId[runtime]}"> Back to my item</a>
            <div class="sender-information">
                <a href="profile.html?sender_id=${result.id[runtime]}" class="user-btn-in-notification"><p>`+result.sender[runtime].substring(0,1)+`
                </p></a><a href="profile.html?sender_id=${result.id[runtime]}">`+result.sender[runtime]+`&nbsp</a>
                <p>sended</p>
            </div>
            </div>
        </div>`
    
    notifiSection.innerHTML = innerHTMLstring 
  
    }
    return result
}

setUpNotificationPage("start")