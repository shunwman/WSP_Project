async function loadTheProfile() {
    let dataForSQL 
    let res
    const paramsString = window.location.search;
    const searchParams = new URLSearchParams(paramsString)
    console.log(searchParams.get('sender_id'))
    if (searchParams.has('sender_id')){
            const formObject = {}
            formObject['sender_id'] = searchParams.get('sender_id')
            console.log(formObject)
            res = await fetch('/user/profile/other', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formObject),
            })
            dataForSQL = await res.json()
            //console.log(result)
           
        }
    if (!searchParams.has('sender_id')){
        res = await fetch('/user/profile')
        dataForSQL = await res.json()
    }
        console.log(dataForSQL)
    if (res.ok){
        let profileSection = document.querySelector('.profile-section')
            profileSection.innerHTML = ''
            let innerHTMLstring = 
                `  <form id="profile-form">
                <h1>Profile </h1>
                <div class="profile-container">
                  <div class="profile-user">
                    <div class="user-btn-in-profile">`
            if (dataForSQL.is_google){
                innerHTMLstring += 
                    dataForSQL.image ? `<img src="${dataForSQL.image}" alt="Image" class="profile-img"/>` : '<p>'+dataForSQL.username.substring(0,1)+'</p>'
            }else{
                innerHTMLstring += 
                dataForSQL.image ? `<img src="/${dataForSQL.image}" alt="Image" class="profile-img"/>` : '<p>'+dataForSQL.username.substring(0,1)+'</p>'
            }
            innerHTMLstring += 
                    `</div>
                    <h2>`+dataForSQL.username+`</h2>`
            if (!searchParams.has('sender_id')){
                innerHTMLstring +=
                    `<button type="button" class="edit-mode-btn input-btn">Edit</button>`
            }
            innerHTMLstring +=
                `<div class="input-btn"><input type="file" name="image_input" class="image-input"/></div>
                <div>
                <input type="submit" value="Save" class="save-submit input-btn"/>
                <input type="reset" value="Cancel" class="cancel-reset input-btn"/>
                </div>
                </div>
                
                <div class="left-container">
                
               
                <h3>Username: </h3>
                <div class="information-div"><div class="arrow-right"></div><p>`+dataForSQL.username+`</p></div><input type="text" name="username_input" class="text-input" pattern="[A-Za-z0-9]+">`
                if (dataForSQL.is_google){
                    innerHTMLstring +=
                        `<h3>Email: </h3>
                        <div class="information-div"><div class="arrow-right"></div><p>`+dataForSQL.email+`</p></div><h6>Not for edit</h6>`
                    }else{
                    innerHTMLstring +=
                        `<h3>Email:</h3>
                        <div class="information-div"><div class="arrow-right"></div><p>`+dataForSQL.email+`</p></div><input type="email" name="email_input" class="text-input">`
                    }    
                    innerHTMLstring +=    
                `<h3>User created at</h3>
                <div class="information-div"><div class="arrow-right"></div><p>`+dataForSQL.created_at.substring(0,10)+`</div></p><h6>Not for edit</h6>
                </div>
                
                <div class="right-container">
                <div class="profile-information-container">
                
                
                <h3>Living Address: </h3>
                <div class="information-div"><div class="arrow-right"></div><p>`+dataForSQL.living_address+`</p></div><input type="text" name="living_address_input" class="text-input">
                <h3>Working Address: </h3>
                <div class="information-div"><div class="arrow-right"></div><p>`+dataForSQL.working_address+`</p></div><input type="text" name="working_address_input" class="text-input">
                <h3>Phone No. </h3>
                <div class="information-div"><div class="arrow-right"></div><p>`+dataForSQL.phone_number+`</p></div><input type="number" name="phone_input" class="text-input">`
            
                
            innerHTMLstring +=    
                `</div>
                </div>
                </div>
                </form>`

            profileSection.innerHTML = innerHTMLstring
                let profileInformations = document.querySelectorAll('.information-div p')
                let profileInputs = document.querySelectorAll('.profile-section input')
                let profileWords = document.querySelectorAll('.profile-section h6')
                for (let profileInformation of profileInformations){
                profileInformation.style.display  = "inline"
                }
                for (let input of profileInputs){
                    input.style.display  = "none"
                }
                for (let word of profileWords){
                    word.style.display  = "none"
                }
                const editModeBtn = document.querySelector('.edit-mode-btn')
                editModeBtn.style.display = "inline"
                setEditMode()
                setCancel()
                editTheProfile(dataForSQL.is_google)
                return
    }
    let profileSection = document.querySelector('.profile-section')
    profileSection.innerHTML = '<h1>No user data. Please return.</h1>'
}

function setEditMode(){
    const editModeBtn = document.querySelector('.edit-mode-btn')
    editModeBtn.addEventListener('click', async (event) =>{
        let profileInformations = document.querySelectorAll('.information-div p')
        let profileInputs = document.querySelectorAll('.profile-section input')
        let profileWords = document.querySelectorAll('.profile-section h6')
        for (let profileInformation of profileInformations){
        //profileInformation.style.display  = "none"
        }
        for (let input of profileInputs){
            input.style.display  = "inline"
        }
        for (let word of profileWords){
            word.style.display  = "none"
        }
        editModeBtn.style.display = "none"
    })
}
function setCancel(){
    const cancelResetBtn = document.querySelector('.cancel-reset')
    cancelResetBtn.addEventListener('click', async (event) =>{
        let profileInformations = document.querySelectorAll('.information-div p')
        let profileInputs = document.querySelectorAll('.profile-section input')
        let profileWords = document.querySelectorAll('.profile-section h6')
        for (let profileInformation of profileInformations){
        profileInformation.style.display  = "inline"
        }
        for (let input of profileInputs){
            input.style.display  = "none"
        }
        for (let word of profileWords){
            word.style.display  = "none"
        }
        const editModeBtn = document.querySelector('.edit-mode-btn')
        editModeBtn.style.display = "inline"
    })
}
async function editTheProfile(is_google){
    const profileFormElements = document.querySelector('#profile-form')
    profileFormElements.addEventListener('submit', async (e) => {
      
		e.preventDefault()  
        
		const form = e.target
		const formData = new FormData()
        const file = form.image_input.files[0]
		formData.append('username', form.username_input.value)
		formData.append('living_address', form.living_address_input.value)
        formData.append('working_address', form.working_address_input.value)
        formData.append('phone', form.phone_input.value)
        if(!is_google){
        formData.append('email', form.email_input.value)
        }
        formData.append('image', file)
        const res = await fetch('/user/profile/formidable', {
			method: 'POST',
			body: formData
		})
        if (res.ok) {
			form.reset()
			loadTheProfile()
            location.reload();
		}else{
            form.reset()
            window.alert("Error! The input of email, username or phone may be existed")
        }
    }
   
)} 

loadTheProfile()


//<h3>User Id: </h3> 
//<div class="information-div"><div class="arrow-right"></div><p>`+dataForSQL.id+`</p></div><h6>Not for edit</h6>