const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/8835f033e15fa5fc6fbe3b671832120d/${latitude},${longitude}?units=uk2`

  request({ url, json: true }, (error, { body }) => {
    // request error
    if (error) {
      callback('Unable to get forecast.', undefined)
    }
    // response error
    else if (body.error) {
      callback('Unable to find location from coordinates provided.', undefined)
    }
    else {
      const {currently, daily} = body
      const {temperature, precipProbability} = currently

      callback(undefined, `${daily.data[0].summary} It is currently ${temperature} degrees. There is a ${precipProbability}% chance of rain and a wind speed of ${daily.data[0].windSpeed}.`)
    }
  })
}

module.exports = forecast