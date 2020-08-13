const request = require('request')

const forecast = ( lat , long , callback) => {
      
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + encodeURIComponent(lat)+'&lon='+ encodeURIComponent(long)+'&%20exclude=hourly,daily&appid=2a9f7d15a0ae6c691ec7095456bc3b02&units=metric&lang=en'
 
    request({ url , json:true },(error, {body})=>{
        if(error){
            callback('Check your internet connectivity', undefined)
        }
        else if(body.message){
            callback('enter correct values', undefined)
        }
        else{
            callback(undefined, 'Weather reports are '+body.current.weather[0].description+',Current temp is '+body.current.temp+' but feels like '+body.current.feels_like+' With Humidity of '+body.current.humidity)
        }
    })
}


module.exports = forecast