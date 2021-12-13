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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-md-4 forecast-details">
            <span class="forecast-days">${formatDay(forecastDay.dt)}</span>
          </div>
          <div class="col-md-4 forecast-details">
            <div id="forecast-icon">
              <img
                src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                width="42"
              />
            </div>
          </div>
          <div class="col-md-4 forecast-details">
            <span class="forecast-temps">
              <span class="forecast-max-temp">${Math.round(
                forecastDay.temp.max
              )}°</span
              ><span class="forecast-min-temp">${Math.round(
                forecastDay.temp.min
              )}°</span>
            </span>
          </div>
          <hr />
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "0cd6606c8a21838ee3d658a5afde4449";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  document.querySelector("#city-name").innerHTML = response.data.name;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#current-weather-icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  document
    .querySelector("#current-weather-icon")
    .setAttribute("alt", response.data.weather[0].description);

  fahrenheiTemp = response.data.main.temp;

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "0cd6606c8a21838ee3d658a5afde4449";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

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

function showCelsiusTemp(event) {
  event.preventDefault();
  let celsiusTemp = ((fahrenheiTemp - 32) * 5) / 9;
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  document.querySelector("#current-temp").innerHTML = Math.round(celsiusTemp);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  document.querySelector("#current-temp").innerHTML = Math.round(fahrenheiTemp);
}

let fahrenheiTemp = null;

let locateButton = document.querySelector("#current-location-btn");
locateButton.addEventListener("click", getLocation);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

search("Phoenix");
