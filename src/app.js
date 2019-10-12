const path = require('path')
const express = require('express')

const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDir))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) return res.send({ error })

        forecast(latitude, longitude, (error, forecast) => {
            if (error) return console.log(error)
            res.send(
                {
                    location,
                    forecast
                }
            )
        })

    })

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Olaf Olafson'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Olaf Olafson'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found',
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found',
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})