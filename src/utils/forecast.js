const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/3b47f2d5cb71356f65f168cf9cafd9a7/${latitude},${longitude}`;

    request({url, json: true}, (error, {body}) => {
        if ( error ) {
            callback('Unable to connect to weather service!', undefined)
        } else if ( body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${Math.round(body.currently.precipProbability)}% chance of rain.`)
        }
    })
}

module.exports = forecast