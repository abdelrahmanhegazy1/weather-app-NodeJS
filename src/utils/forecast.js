const request = require('request')

const weatherBaseURL = "https://api.openweathermap.org/data/2.5/weather?"
const appID = "&appid=202bd68c8b9dec4b1b36a310dc899162"


const forecast = (lat, lon, callback) => {
    const url = weatherBaseURL + "lat=" + lat + "&lon=" + lon+appID
    request({ url, json: true }, (error, {body}={}) => {
        if(error){
            callback('Unable to connect with weather service',undefined)
        }
        else if(body.cod==='400'){
            callback(body.message,undefined)

        }
        else {
            const temp= body.main.temp
            const weatherType = body.weather[0].main
            const weatherDescription = body.weather[0].description
            callback(undefined,'The current temp is '+temp+' and the weather Type is '+weatherType+' and it has '+weatherDescription)
        }

    })

}

module.exports = forecast