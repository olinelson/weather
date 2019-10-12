console.log('this is client side js app.js')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

const fetchForecast = (locationString) => {
    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''

    fetch(`http://localhost:3000/weather?address=${locationString}`).then((res) => {
        res.json().then(({ error, location, forecast }) => {

            if (error) {
                messageOne.textContent = error
                messageTwo.textContent = ""
            }

            else {
                messageOne.textContent = location
                messageTwo.textContent = forecast
            }


        })

    })

}

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const locationString = search.value
    fetchForecast(locationString)
})