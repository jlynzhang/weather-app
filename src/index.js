// Day & time display
let now = new Date();
let day = now.getDay();
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
day = days[now.getDay()];

let dayNow = document.querySelector("#day");
dayNow.innerHTML = `${day}`;
let timeNow = document.querySelector("#time");
timeNow.innerHTML = now.toLocaleString("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});

// Search engine
function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${temperature}`;

  let h1 = document.querySelector("#city-name");
  h1.innerHTML = `${response.data.name}`;
}

function searchCityWeather(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let apiKey = "0cd6606c8a21838ee3d658a5afde4449";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCityWeather);

// Navigator

function tempByLocation(position) {
  let apiKey = "0cd6606c8a21838ee3d658a5afde4449";
  let units = "imperial";
  let apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl2}&appid=${apiKey}`).then(showWeather);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(tempByLocation);
}

let locateButton = document.querySelector("#current-location-btn");
locateButton.addEventListener("click", getLocation);