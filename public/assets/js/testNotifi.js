async function testNotifiMessageButton() {
	const logoutFormElement = document.querySelector('.notification-testing-button')
	logoutFormElement.addEventListener('click', async (event) => {
        console.log('clicked')
        let res = await fetch('/user/testNotifi')
        let result = await res.json()
      })}

testNotifiMessageButton()