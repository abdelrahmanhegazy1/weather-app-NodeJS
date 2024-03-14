const request = require('request')
const geoApiKey = "&api_key=65f1c57c96002453270260zhebf8348"
const geoApiURL = "https://geocode.maps.co/search?q="

const geoCode = (address,callback)=>{
    const url = geoApiURL+address+geoApiKey
    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('Unable to connect to location services',undefined)
        }
        else if(body.length===0){
            callback('Unable to find location,Try another place',undefined)
        }
        else {
            const lon= body[0].lon
            const lat= body[0].lat
            const cityName =body[0].display_name

            callback(undefined,{
                latitude:lat,
                longitude:lon,
                location:cityName
            })
        }
    })
}

module.exports = geoCode
