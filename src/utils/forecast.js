const request = require('request')
//forecast function
const forecast = (latitude, longitude, callback) => {
  //console.log('latitude=' + isNaN(latitude))
  //console.log('longitude=' + isNaN(longitude))
  if(!isNaN(latitude) && !isNaN(longitude))
  {
    const forecasturl = 'https://api.darksky.net/forecast/4ffdf0c8a40094edb091a94595ccbb85/' + latitude + ',' + longitude + '?units=us'

    //console.log(forecasturl)

    request({ url: forecasturl, json: true }, (error, response) => {
      if (error) {
        callback('Error occurred when requesting weather information.', undefined)
        //console.log("Error occurred when requesting weather information.")
      }
      else if (response.body.error) {
        callback('Unable to find location.', undefined)
        //console.log("Unable to find location")
      }
      else {
        const currtemp = response.body.currently.temperature
        const currchance = response.body.currently.precipProbability * 100 + ' percent'
        const dailysummary = response.body.daily.data[0].summary

        const forecastinfo = "It is currently " + currtemp + " degrees out. There is a " + currchance + "% chance of precipatation"
        //one way to call the callback
        //callback(undefined, "It is currently " + currtemp + " degrees out. There is a " + currchance + "% chance of precipatation")
        //another way to return a json structure
        callback(undefined, {
          currtemp: currtemp,
          currchance: currchance,
          dailysummary: dailysummary,
          forecastinfo: forecastinfo
        })
        //console.log(response.body.daily.data[0].summary)
        //console.log("It is currently " + currtemp + " degrees out. There is a " + currchance + "% chance of precipatation")
      }
    })
  }
  else
  {
    callback('Invalid lat or lon.', undefined)
  }
}

module.exports = forecast