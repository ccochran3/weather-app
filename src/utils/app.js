import axios from 'axios'
import geocode from './utils/geocode.js';
import forecast from './utils/forecast.js';

console.log(process.argv)
const address = process.argv[2]

if (!address) {
    console.log("must provide an address")
} else {
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
           return console.log(error)
        }
        forecast(latitude, longitude, (error, foreCastData) => {
            if (error) {
                return console.log(error)
            }
            console.log('Data:', foreCastData, `Location: ${location}`)
        })
    })
}

