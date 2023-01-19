async function login() {
	const loginForm = document.querySelector('#login-form')
	console.log(loginForm)
	loginForm.addEventListener('submit', async (e) => {
		e.preventDefault()
		const form = e.target
		const email = form.email.value
		const password = form.password.value
		const res = await fetch('/user/login', {
			method: 'POST',
			body: JSON.stringify({
				email,
				password
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		if (res.ok) {
			console.log('Login successful')
			window.location.href = "/index.html"
		}else {
			window.alert("Error. Wrong password or email")
		}
	})
}


login()