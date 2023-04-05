//default city bakersfield
let currentCity = "Bakersfield";

let city = document.querySelector(".city");
let datetime = document.querySelector(".datetime")
let weather__forecast = document.querySelector('.forecast');
let weather__temperature = document.querySelector(".temperature");
let icon = document.querySelector(".icon");
let minimum_temp = document.getElementById("min_temp");
let maximum_temp = document.getElementById("max_temp");
let weather__realfeel = document.querySelector('.weather__realfeel');
let section__humidity = document.querySelector('.weather__humidity');
let section__wind = document.querySelector('.weather__wind');
let section__pressure = document.querySelector('.weather__pressure');

document.querySelector(".search-bar").addEventListener('submit', enter => {
    let search = document.querySelector(".search-form");
    enter.preventDefault();//to prevent default action for city
    currentCity = search.value;   // change current city into the entered city
    getWeather();  //calling function getweather for weather forecast 
    search.value = ""
})


function TimeandDate(time, timezone) {
    const date = new Date((time + timezone) * 1000);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayOfweek = days[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const todaysDate = `${dayOfweek}, ${dayOfMonth} ${month} ${year} `;
    return todaysDate;
  }
  

// convert country code to name
function CountryCode(country){
    const regionNamesInEnglish = new Intl.DisplayNames(['en'], { type: 'region' });
    return regionNamesInEnglish.of(country)
}

function getWeather(){
    const APIKEY = '2d1a78b13905d697aa0bc1854060e584'

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${APIKEY}&units=metric`)
.then(response => response.json())
.then(data => {
    console.log(data)
    city.innerHTML = `${data.name}, ${CountryCode(data.sys.country)}`
    datetime.innerHTML = TimeandDate(data.dt, data.timezone); 
    weather__forecast.innerHTML = `<p>${data.weather[0].main}`
    weather__temperature.innerHTML = `${data.main.temp.toFixed()}&#176C`
    icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" />`
    minimum_temp.innerHTML = `${data.main.temp_min.toFixed()}`
    maximum_temp.innerHTML = `${data.main.temp_max.toFixed()}`
    weather__realfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176C`
    section__humidity.innerHTML = `${data.main.humidity}%`;
    section__wind.innerHTML = `${data.wind.speed} km/hr`;
    section__pressure.innerHTML = `${data.main.pressure} hPa`;
    
}).catch(error => {
    console.error(error);
  });
}
document.body.addEventListener('load', getWeather());
