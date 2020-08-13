const request = require('request')

const geocode = (address , callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoia3NoaXRpemdvZWwwNyIsImEiOiJja2Q3c205am8wbjk3MndzY2kybmh4OTI2In0.gjcyvHJpPk0opg7mUFX0jA&limit=1'
  
         request({ url , json: true}, (error , {body}) => {
          if(error) {
                callback('Please check your connectivity !!', undefined)
            } else if(body.features.length === 0){
                callback('Entered Place Doesnt exist !!', undefined)
            } else { 
              callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
              })
         }
        })
      }

      module.exports = geocode 