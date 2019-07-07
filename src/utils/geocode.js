const request = require('request')

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYW50aHdpbnRlciIsImEiOiJjanhwNWR6Y3QwOXQ3M2RvMmg2enZhdnVzIn0.5eV5KTV_v2U-waB9OOfoPg&limit=1`

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services', undefined)
    }
    else if (!body.features.length) {
      callback('Unable to find localtion. Try another search.', undefined)
    }
    else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      })
    }
  })
}

module.exports = geocode