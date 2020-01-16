const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')

const app = express()

//Define Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

//This receives the handlebars index page and renders it to the view
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Wilson Acosta'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Wilson Acosta'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is my message',
        name: 'Wilson Acosta'
    })
})

app.get('/weather', (req, res) => {
    const location = req.query.address;

    if (!location) {
        return res.send({
            error: 'Please provide an address'
        })
    }

    geocode(location, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help Article not found',
        name: 'Wilson Acosta'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page Not Found',
        name: 'Wilson Acosta'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})