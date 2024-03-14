const express = require('express')
const forecast = require('./utils/forecast')
const geoCode = require('./utils/geocode')
const path = require('path')
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
// Setup handlebars engine and view location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Abdelrahman Hegazy',
    })
})

app.get('/help',(req,res)=> {
    res.render('help',{
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'abdelrahman hegazy'
    })
})
app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Abdelrahman Hegazy'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Please provide address to show you the weather"
        })
    }
    geoCode(req.query.address,(error,{latitude,longitude,location}= {})=>{
        if(!error){
            forecast(latitude,longitude,(error,forecastData)=>{
                if(forecastData){

                    return res.send({
                        location,
                        forecast:forecastData,
                        address: req.query.address
                    }
                    )
                }
                else {
                    return res.send({
                        error
                    })
                }
            })
        }
        else {
            return res.send({
                error
            })
        }
    })
    //res.send('Weather page!')
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term',
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404-Page',{
        title:'404',
        errorMessage: 'Article Not Found!!',
        name: 'Abdelrahman Hegazy'
    })
})
app.get('*',(req,res)=>{
    res.render('404-Page',{
        title:'404',
        errorMessage: 'Page Not Found!!',
        name: 'Abdelrahman Hegazy'
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})