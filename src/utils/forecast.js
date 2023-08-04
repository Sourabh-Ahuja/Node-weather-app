const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=bb2bd50dfd2da932ab17dff262b0e8d8&query=' + latitude +',' + longitude + '&units=f'

     request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('unable to connect weather service', undefined)
        } else if (body.error) {
            callback('unable to find location', undefined)
        } else {
            const current = body.current
            const description = current.weather_descriptions[0]
            const data = description + '. It is currently ' + current.temperature + ' degress out. it feels like ' + current.feelslike + ' degress out.'
            callback(undefined, data)
        }
     })
    }

module.exports = forecast