const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { title } = require('process')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()

const port = process.env.PORT || 3000

// define paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location 
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// set up staic directory to serve
app.use(express.static(publicDir))

// example: 
// user go for some domain e.g app.com
// for static we can res.send() and for dynamic we can use res.render()
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Sourabh'
    })
})

// user go for some domain e.g app.com/help
app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Learning node course to become a full stack engineer',
        title: 'Help',
        name: 'Sourabh'
    })
})

// // user go for some domain e.g app.com/about
app.get('/about', (req, res) => {
   // res.send('<h1>About Weather app</h1>')
    res.render('about', {
        title: 'Weather app About page',
        name: 'Sourabh'
    })
})

// user go for some domain e.g app.com/weather
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address to get weather.'
        })
       
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if(error) {
          return res.send({ error })
        } 
      
        forecast(latitude, longitude, (error, forecastData) => {
          if(error) {
              return res.send({ error })
          }
          res.send({
            forecast: forecastData,
            location,
            address: req.query.address
        })
        })
      })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
       
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('pageNotFound', {
        title: 'Help article not found',
        name: 'Sourabh'
    })
})

app.get('*', (req, res) => {
    res.render('pageNotFound', {
        title: '404 Page not found',
        name: 'Sourabh'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + 3000)
})