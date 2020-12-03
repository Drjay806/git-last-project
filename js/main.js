var button = document.querySelector(".button");
var inputvalue = document.querySelector(".inputvalue");
var iconss = document.querySelector(".icon");
var temp = document.querySelector(".temp-value p");
var desc = document.querySelector(".temp-description p");
var location = document.querySelector(".temp-location p");

// App data
const weather = {};

weather.temperature = {
  unit: "celsius"
};

// APP CONSTS AND VARS
const KELVIN = 273;
// API KEY
const key = "0478fd000646a6048f90879b2fcfa377";

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

// SET USER'S POSITION
function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error) {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude) {
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
    })
    .then(function () {
      displayWeather();
    });
}

// DISPLAY WEATHER TO UI
function displayWeather() {
  iconss.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
  temp.innerHTML = `${weather.temperature.value}°<span>C</span>`;
  desc.innerHTML = weather.description;
  location.innerHTML = `${weather.city}`;
}

// C to F conversion
function celsiusToFahrenheit(temperature) {
  return (temperature * 9) / 5 + 32;
}

temp.addEventListener(
  "click",
  function () {
    if (weather.temperature.value === undefined) return;

    if (weather.temperature.unit == "celsius") {
      let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
      fahrenheit = Math.floor(fahrenheit);

      temp.innerHTML = `${fahrenheit}°<span>F</span>`;
      weather.temperature.unit = "fahrenheit";
    } else {
      temp.innerHTML = `${weather.temperature.value}°<span>C</span>`;
      weather.temperature.unit = "celsius";
    }
  },
  { once: true }
);

button.addEventListener("click", function () {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${inputvalue.value}&appid=${key}`
  )
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.description = data.weather[0].description;
      weather.iconId = data.weather[0].icon;
      weather.city = data.name;
      weather.country = data.sys.country;
    })
    .then(function () {
      displayWeather();
    });
});
