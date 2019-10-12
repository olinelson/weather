const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const weatherIcon = document.querySelector('#weather-icon')
const loadingContainer = document.querySelector('#loading-container')

const getWeatherIcon = (iconName) => {
    switch (iconName) {
        case 'clear-day':
            weatherIcon.className = "fas fa-sun"
            break
        case 'clear-night':
            weatherIcon.className = "fas fa-moon"
            break
        case 'rain':
            weatherIcon.className = "fas fa-cloud-rain"
            break
        case 'snow':
            weatherIcon.className = "fas fa-snowflake"
            break
        case 'sleet':
            weatherIcon.className = "fas fa-snowflake"
            break
        case 'wind':
            weatherIcon.className = "fas fa-wind"
            break
        case 'fog':
            weatherIcon.className = "fas fa-fog"
            break
        case 'cloudy':
            weatherIcon.className = "fas fa-cloud"
            break
        case 'partly-cloudy-day':
            weatherIcon.className = "fas fa-cloud-sun"
            break
        case 'partly-cloudy-night':
            weatherIcon.className = "fas fa-cloud-moon"
            break
        default:
            weatherIcon.className = "fas fa-sun"
    }
}

const fetchForecast = (locationString) => {
    loadingContainer.innerHTML = `<i class="fas fa-spinner"></i>`
    messageOne.textContent = ''
    messageTwo.textContent = ''
    weatherIcon.className = ''

    fetch(`/weather?address=${locationString}`).then((res) => {
        res.json().then(({ error, location, forecast }) => {

            if (error) {
                messageOne.textContent = error
                messageTwo.textContent = ""
                loadingContainer.innerHTML = ``
            }

            else {
                messageOne.textContent = location
                messageTwo.textContent = forecast.status
                getWeatherIcon(forecast.icon)
                loadingContainer.innerHTML = ``
            }


        })

    })

}

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const locationString = search.value
    fetchForecast(locationString)
})