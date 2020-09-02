const axios = require('axios')

const weather = (lat, long, callback) => {
    axios.get('/current', {
        baseURL: 'http://api.weatherstack.com/',
        timeout: 1000,
        responseType: 'json',
        method: 'get',
        params: {
            access_key: process.env.WEATHERSTACK_API,
            units: 'f',
            query: `${lat},${long}`,
        }
    }).then(response => {
        if (response.data.current) {
            const { temperature, feelslike: feelsLike, weather_descriptions: description } = response.data.current
            callback(undefined, { temperature, feelsLike, description })
        } else {
            const error = response.data.error
            const errorMessage = `ERROR :: CODE=${error.code} TYPE=${error.type} INFO=${error.info}`
            callback(errorMessage, undefined)
        }
    }).catch(err => {
        console.log(`Unable to connect to weatherstack.com`)
    })
}


module.exports = weather