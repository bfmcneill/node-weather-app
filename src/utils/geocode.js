const axios = require('axios')

const geocode = (place, callback) => {
    axios.get(`/${place}.json`, {
        baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places/',
        timeout: 1000,
        responseType: 'json',
        method: 'get',
        params: {
            access_token: process.env.MAPBOX_API,
            limit: 1
        }
    }).then(response => {
        if (response.data.features.length > 0) {
            const place = response.data.features[0]
            const lat = place.center[1]
            const long = place.center[0]
            const location = place.place_name
            callback(undefined, { lat, long, location })
        } else {
            callback(`That location does not exist`, undefined)
        }
    }).catch((err) => {
        callback(`Unable to connect to MapBox\n ${err}`, undefined)
    })
}

module.exports = geocode