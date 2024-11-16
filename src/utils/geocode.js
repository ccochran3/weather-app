import axios from 'axios';

const MAPBOX_API_KEY = 'pk.eyJ1IjoiY2NvY2hyYW4zIiwiYSI6ImNtMno5dmttNDA5bzcycXExaHE4d3JubGcifQ.unc3m6Xn-aD39BQkjqSXKg'


const geocode = (address, cb) => {
    const url = 'https://api.mapbox.com/search/geocode/v6/forward';
    const data = address
    axios.request({
        url,
        method: 'get',
        responseType: 'json',
        params: {
            access_token: MAPBOX_API_KEY,
            q: data
        }
    }).then(response => {
        const {data} = response
        if (!data.features.length) {
            cb('Unable to find location. Try another search.', undefined);
        } else {
            cb(undefined, {
                latitude: data.features[0].properties.coordinates.latitude,
                longitude: data.features[0].properties.coordinates.longitude,
                location: data.features[0].properties.name
            })
        }
    }).catch(error => {
        cb('Unable to connect to location services', undefined);
    })
}

export default geocode;