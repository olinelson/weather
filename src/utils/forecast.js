const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/9b83afd1127a40cafc8a25905957005a/${latitude},${longitude}?units=si`

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (body.error) {
            callback('Unable to find location, try another search', undefined)
        }
        else {
            const currently = body.currently
            callback(undefined, `${body.daily.data[0].summary} It is currently ${currently.temperature} degrees celsius. There is currently a ${currently.precipProbability}% chance of rain.`)

        }



    })

}




module.exports = forecast
