const weatherForm = document.querySelector('form')
const $searchButton = document.querySelector('#search-button')
const $getLocationButton = document.querySelector('#get-location-button')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const weatherIcon = document.querySelector('#weather-icon')
const $loadingContainer = document.querySelector('#loading-container')

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
    $loadingContainer.innerHTML = `<i class="fas fa-spinner"></i>`
    messageOne.textContent = ''
    messageTwo.textContent = ''
    weatherIcon.className = ''

    fetch(`/weather?address=${locationString}`).then((res) => {
        res.json().then(({ error, location, forecast }) => {

            if (error) {
                messageOne.textContent = error
                messageTwo.textContent = ""
                $loadingContainer.innerHTML = ``
            }

            else {
                messageOne.textContent = location
                messageTwo.textContent = forecast.status
                getWeatherIcon(forecast.icon)
                $loadingContainer.innerHTML = ``
            }


        })

    })

}

$searchButton.addEventListener('click', (event) => {
    event.preventDefault()
    const locationString = search.value
    fetchForecast(locationString)
})

const fetchForecastFromLocation = () => {

    $getLocationButton.setAttribute('disabled', 'disabled')
    search.value = 'Current Location'

    $loadingContainer.innerHTML = `<i class="fas fa-spinner"></i>`
    messageOne.textContent = ''
    messageTwo.textContent = ''
    weatherIcon.className = ''

    navigator.geolocation.getCurrentPosition((position) => {

        latitude = position.coords.latitude
        longitude = position.coords.longitude


        fetch(`/forecast?latitude=${latitude}&longitude=${longitude}`).then((res) => {
            res.json().then(({ error, location, forecast }) => {
                $getLocationButton.removeAttribute('disabled')
                if (error) {
                    messageOne.textContent = error
                    messageTwo.textContent = ""
                    $loadingContainer.innerHTML = ``
                }

                else {
                    messageOne.textContent = location
                    messageTwo.textContent = forecast.status
                    getWeatherIcon(forecast.icon)
                    $loadingContainer.innerHTML = ``
                }


            })

        })

    })
    $getLocationButton.setAttribute('disabled', 'disabled')
    search.value = 'Current Location'

    $loadingContainer.innerHTML = `<i class="fas fa-spinner"></i>`
    messageOne.textContent = ''
    messageTwo.textContent = ''
    weatherIcon.className = ''

    navigator.geolocation.getCurrentPosition((position) => {

        latitude = position.coords.latitude
        longitude = position.coords.longitude


        fetch(`/forecast?latitude=${latitude}&longitude=${longitude}`).then((res) => {
            res.json().then(({ error, location, forecast }) => {
                $getLocationButton.removeAttribute('disabled')
                if (error) {
                    messageOne.textContent = error
                    messageTwo.textContent = ""
                    $loadingContainer.innerHTML = ``
                }

                else {
                    messageOne.textContent = location
                    messageTwo.textContent = forecast.status
                    getWeatherIcon(forecast.icon)
                    $loadingContainer.innerHTML = ``
                }


            })

        })

    })
}

$getLocationButton.addEventListener('click', (event) => {
    event.preventDefault()
    fetchForecastFromLocation()
})

window.addEventListener('DOMContentLoaded', (event) => {
    fetchForecastFromLocation()
});


