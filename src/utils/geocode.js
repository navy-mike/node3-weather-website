const request = require('request')

//geocode function
const geocode = (address, callback) => {
  const geourl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?proximity=-111.8904,40.767&access_token=pk.eyJ1IjoibWtqb2huc29uODQ2NjAiLCJhIjoiY2p1OGtkbmc4MG1zdTRlcGxqM3h2MXJ2cCJ9.GiyOPNF8C5O2oRlfj1AKFA&limit=1'

  //console.log(geourl)

  request({ url: geourl, json: true }, (error, response) => {
    //console.log(response.body.features[0].center[1])
    if (error) {
      callback('Error occurred when requesting geo coordinate information.', undefined)
      //console.log("Error occurred when requesting geo coordinate information.")
    }
    else if (!response.body.features) {
      callback('Unable to find lat/lon for location specified.', undefined)
      //console.log("Unable to find lat/lon for location specified.")
    }
    else {
      //console.log(response)
      if (!response.body.features[0]) {
        callback('No features returned', undefined)
      }
      else {
        const latitude = response.body.features[0].center[1]
        const longitude = response.body.features[0].center[0]
        const placename = response.body.features[0].place_name
        //one way to call the callback
        //callback(undefined, "latitude=" + latitude + " longitude=" + longitude)
        //another way to return a json structure
        callback(undefined, {
          latitude: latitude,
          longitude: longitude,
          placename: placename
        })
      }

      //console.log("latitude=" + latitude + " longitude=" + longitude)
    }
  })
}

module.exports = geocode