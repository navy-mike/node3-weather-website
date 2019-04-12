console.log('client javascript file is loaded.')

//console.log('hello')

const weatherform = document.querySelector('form')
const searchelement = document.querySelector('input')
const errormsg = document.querySelector('#errormsg')
const locationdata = document.querySelector('#locationdata')
const forecastdata = document.querySelector('#forecastdata')
const summarydata = document.querySelector('#summarydata')

errormsg.textContent = ''
locationdata.textContent = ''
forecastdata.textContent = ''
summarydata.textContent = ''

//add event listener
weatherform.addEventListener('submit', (e) => {

  errormsg.textContent = '...Retrieving Weather Data...'
  e.preventDefault()
  const location = searchelement.value

  //console.log(location)

  fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        //console.log(data.error)
        errormsg.textContent = data.error
      }
      else {
        errormsg.textContent = ''
        locationdata.textContent = data.location
        forecastdata.textContent = data.forecast
        summarydata.textContent = data.summary

        // + '<\br>' + data.forecast + '<\br' + data.summary
        //console.log(data.location)
        //console.log(data.forecast)
        //console.log(data.summary)
      }
    })
  })

})