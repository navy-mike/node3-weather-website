const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express() //create server
const port = process.env.PORT || 3000  //<==heroku port definitions and locally port definitions

//console.log(__dirname)  //C:\nodejs_stuff\udemycoursethecomplete\web-server\src
//console.log(__filename)  //C:\nodejs_stuff\udemycoursethecomplete\web-server\src
//console.log(path.join(__dirname, '../public')) //add public to path = c:\nodejs_stuff\udemycoursethecomplete\web-server\public

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public') //root
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views locations
app.set('view engine','hbs') //get handlebars setup to use in app
app.set('views', viewsPath) //<=point to templates views path
hbs.registerPartials(partialsPath) //<=point to templates partials path

//setup static director to server
app.use(express.static(publicDirectoryPath)) //Sets the server to serve up any filename.html thats within the public folder.

app.get('',(req,res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Michael'
  })
})

app.get('/about', (req, res) => { 
  res.render('about', {
    title: 'About',
    name: 'Michael'
  }) 
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Michael',
    message: 'This is the Help Message.'
  })
})

//weather route
app.get('/weather', (req, res) => {
  if (!req.query.address) 
  {
    res.send({
      error: 'You must provide a address.'
    })
  }
  else 
  {
    //console.log("ADDRESS=" + req.query.address)
    //call geocode function
    //                          vvvvv, vvvv = 2 args for callback
    //geocode(req.query.address, (error, geocodeData) => {
    geocode(req.query.address, (error, geocodeData) => {
      //console.log('Error', error)
      //console.log('Data', data)
      if (error == undefined) {
        //call forecast function
        //       vv.vvvv,  vvv.vvvv = 2 args for callback
        forecast(geocodeData.latitude, geocodeData.longitude, (error, forecastData) => {
          if (error == undefined) 
          {
            //call forecast function
            //       vv.vvvv,  vvv.vvvv = 2 args for callback
            forecast(geocodeData.latitude, geocodeData.longitude, (error, forecastData) => {
              if (error == undefined) {
                //console.log('Error', error)
                //console.log('Data', data)
                //console.log(geocodeData.placename)
                //console.log(forecastData.forecastinfo)
                //console.log(forecastData.dailysummary)
                res.send({
                  forecast: forecastData.forecastinfo,
                  location: geocodeData.placename,
                  summary: forecastData.dailysummary,
                  temphigh: forecastData.temphigh,
                  templow: forecastData.templow
                })  //send JSON


              }
              else {
                res.send({
                  error: 'Weather Forecast Error=' + error
                }) 
              }
            })
          }
          else {
            res.send({
              error: 'Weather Forecast Error=' + error
            })         
          }
        })
      }
      else {
        res.send({
          error: 'app.js geocode ERROR=' + error
        })
      }
    })
  }
})//end get-weather 

//querystrings
app.get('/products', (req, res) => {
  if(!req.query.search)
  {
    res.send({
      error: 'You must provide a search term.'
    })
  }
  else
  {
    console.log(req.query.search)
    res.send({
      products: []
    })
  }
})


//404 handler routes under another view. any help 404's.
 app.get('/help/*', (req, res) => {
   res.render('page404', {
     title: '404 error.',
     name: 'Mike Johnson',
     errorMessage: 'Help article not found.'
   })
 })

//404 handler must be the last route before listener
app.get('*', (req, res) => {
   res.render('page404', {
     title: '404 error.',
     name: 'Mike Johnson',
     errorMessage: 'Page not found.'
   })
})

//start server listening on port 3000. default web ports are usually 80
//----- LOCAL LISTEN CODE -----
//app.listen(3000, () => {    
//  console.log('server is up on port 3000.')
//}) 
//-----------------------------

//----- HEROKU LISTEN CODE -----
app.listen(port, () => {  //port is defined at top of code
  console.log('server is up on port ' + port + '.')
}) 
//-----------------------------




//app.use(express.static(aboutPath))
//have a domain called app.com          <= root route
//                     app.com/help     <= route
//                     app.com/about    <= route
//                     app.com/weather  <= route
//                     app.com/index    <= route for dynamic content using handlebars
//========== original single route app.get calls ========================
/* the following code serves up the html file in the /public folder, index.html just like the below app.get(''.....)
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath)) //way to customize the server
*/
//note: req=request, res=response. '' empty string will get the root domain. app.com
// app.get('', (req, res) => {
//   res.send('hello express.') //send back to requester

// })//end get root

// app.get('/help', (req, res) => {
//   res.send({
//     name: 'Micheal', //send back JSON
//     age: 67
//   })
// })//end get-help

// app.get('/about', (req, res) => {
//   res.send('<h1>about page.</h1>')  //send back html

// })//end get-about
//====================================================================