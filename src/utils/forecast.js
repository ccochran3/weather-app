import axios from 'axios';

const WEATHER_API_KEY = 'c16b6aef0d07557aa60455b7a10e8721'

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude, longitude, cb) => {
    axios.request({
        url: 'http://api.weatherstack.com/current',
        type: 'get',
        responseType: 'json',
        params: {
            access_key: WEATHER_API_KEY,
            query: `${latitude},${longitude}`
        }
    }).then(response => {
        const {data} = response;
        if (data.error) {
            cb('No weather found for location', undefined)
        } else {
            cb(undefined, `${data.current.weather_descriptions[0]}. It is currently ${data.current.temperature} degrees out. It feels like ${data.current.feelslike} degrees out.`)
        }
    }).catch(error => {
        cb('Unable to connect to services', undefined)
    })

}

export default forecast

// try {
//     const test = await axios.request({
//         url: 'http://api.weatherstack.com/current',
//         method: 'get',
//         params: {
//             access_key: WEATHER_API_KEY,
//             query: '#1tsg5'
//         }
//     })
//     if (!test.data.success) {
//         console.log(test)
//         const {code, type, info} = test.data.error
//         throw new Error(`Error: ${info}`)
//     }
// } catch (e) {
//     console.log(e)
// }

// axios.request({
//     url: 'http://api.weatherstack.com/current',
//     method: 'get',
//     responseType: 'json',
//     params: {
//         access_key: API_KEY,
//         query: 'Yucaipa',
//         units: 'f'
//     }
// }).then((response) => {
//     const currentData = response.data.current;
//     console.log(currentData)
//     console.log(`${currentData.weather_descriptions[0]}. It is currently ${currentData.temperature} degrees out. It feels like ${currentData.feelslike} degrees out.`)
// })