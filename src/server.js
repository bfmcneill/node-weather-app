if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    console.log('The value for NODE_ENV is:', process.env.NODE_ENV);
}
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()
const PORT = process.env.PORT || 3000

// define paths for express config
const rootPath = path.join(__dirname, '../')
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')



//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Ben McNeill"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Ben McNeill"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        })
    }
    console.log(req.query.address)

    geocode(req.query.address, (error, { lat, long, location } = {}) => {
        console.log(lat, long, location)
        if (error) {
            return res.send({ error })
        }
        weather(lat, long, (error, { temperature, feelsLike, description, humidity, observation_time }) => {
            if (error) {
                return res.send({ error })
            }
            // console.log(location)
            const descMessage = `As of ${observation_time} ${description[0]}, ${temperature} °F but it feels like ${feelsLike} °F`
            res.send({ location, temperature, feelsLike, humidity, description: description[0], descMessage })
        })
    })
})

app.get('/products', (req, res) => {
    console.log(req.query)
    if (!req.query.search) {
        return res.send({ error: 'You must provide a search term' })
    }
    res.send({
        products: []
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        'title': 'Help',
        'name': 'Ben McNeill',
        'helpText': 'This is a help message'
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ben McNeill',
        errorMessage: 'Help Article Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ben McNeill',
        errorMessage: 'Page Not Found'
    })
})

app.listen(PORT, () => {
    return console.log(`Server is up on port ${PORT}`)
})


