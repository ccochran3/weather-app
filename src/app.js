import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import hbs from 'hbs'
import geocode from './utils/geocode.js';
import forecast from './utils/forecast.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // gives a path, can then join the path i wanna serve

const app = express();

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectory)) // inital landing page comes from here

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About from hbs',
        name: 'casey about'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        message: ' this is a help message, please help me',
        title: 'Help',
        age: 27,
        name: "casey help"
    })
})

app.get('/weather', (req,res) => {
    const { address } = req.query;
    if (!address) {
       return res.send({
            error: "Must provide an address"
        })
    }
    
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
           return res.send({error})
        }
        forecast(latitude, longitude, (error, foreCastData) => {
            if (error) {
                return res.send(error)
            }
            return res.send({
                message: 'Weather Data here',
                data: foreCastData,
                location
            })
        })
    })
    // res.send({
    //     message: "address was provided",
    //     address, 
    //     test 
    // })
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error: "Must provide a search term"
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: "Error title for help directory",
        name: "casey",
        error: "No help pages found"
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: "Error title",
        name: "casey",
        error: "Page not found"
    })
})

app.listen(3000, () => {
    console.log(`Listening on port 3000`)
})