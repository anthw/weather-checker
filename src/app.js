const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handles bars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory
app.use(express.static(publicPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather Application',
    author: 'Anth Winter',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    author: 'Anth Winter',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    author: 'Anth Winter',
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must supply an address',
    })
  }

  geocode(req.query.address, (geocodeError, geocodeData) => {
    if (geocodeError) {
      return res.send({
        error: geocodeError,
      }) 
    }

    forecast(geocodeData.latitude, geocodeData.longitude, (forecastError, forecastData) => {
      if (forecastError) {
        return res.send({
          error: forecastError,
        }) 
      }

      res.send({
        forecast: forecastData,
        location: geocodeData.location,
        address: req.query.address,
      })
    })
  })

})

app.get('/help/*', (req, res) => {
  res.render('404', {
    error: 'Help article not found.'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    error: 'Page not found.'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
})