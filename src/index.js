let currentTime = new Date();
function dateTime(date) {
  let days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
  let currentMinute = date.getMinutes();
  let currentDate = `${currentDay} ${currentHour}:${currentMinute}`;

  return currentDate;
}
let currentDate = document.querySelector("#date");
currentDate.innerHTML = dateTime(currentTime);

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
}
function getTemperature() {
  let city = document.querySelector("#search-input").value;
  let apiKey = "9365a3e4de9e668a1c2509dfa8abe0d4";
  let unit = "&units=imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}${unit}`;
  axios.get(apiUrl).then(showTemperature);
}
let button = document.querySelector("#search-form");
button.addEventListener("submit", getTemperature);

function showTemperature(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let mainTemp = document.querySelector("#main-temp");
  let min = Math.round(response.data.main.temp_min);
  let max = Math.round(response.data.main.temp_max);
  let minMaxTemp = document.querySelector("#temp-2");
  let description = response.data.weather[0].description;
  let currentCondition = document.querySelector("#weather-description");
  let iconElement = document.querySelector("#icon");
  let humidity = response.data.main.humidity;
  let humidElement = document.querySelector("#humidity");

  fahrenheitTemperature = response.data.main.temp;

  mainTemp.innerHTML = `${temperature}`;
  minMaxTemp.innerHTML = `${max}º/${min}º`;
  currentCondition.innerHTML = `${description}`;
  humidElement.innerHTML = `${humidity}`;
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  humidElement.innerHTML = `${humidity}`;
}

function showCurrentPosition(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
  let temperature = Math.round(response.data.main.temp);
  let mainTemp = document.querySelector("#main-temp");
  mainTemp.innerHTML = `${temperature}`;
  let min = Math.round(response.data.main.temp_min);
  let max = Math.round(response.data.main.temp_max);
  let minMaxTemp = document.querySelector("#temp-2");
  minMaxTemp.innerHTML = `${max}º/${min}º`;
  let description = response.data.weather[0].description;
  let currentCondition = document.querySelector("#weather-description");
  currentCondition.innerHTML = `${description}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let humidity = response.data.main.humidity;
  let humidElement = document.querySelector("#humidity");
  humidElement.innerHTML = `${humidity}`;
}
function retrievePosition(position) {
  let apiKey = "9365a3e4de9e668a1c2509dfa8abe0d4";
  let unit = "&units=imperial";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}${unit}`;
  axios.get(url).then(showCurrentPosition);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let positionButton = document.querySelector("#button-addon1");
positionButton.addEventListener("click", getCurrentPosition);

function showCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temp");
  fahrenheitLink.classList.add("active");
  celciusLink.classList.remove("active");
  let celciusTemperature = Math.round((fahrenheitTemperature - 32) / 1.8);
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

function showFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temp");
  fahrenheitLink.classList.remove("active");
  celciusLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function search(city) {
  let apiKey = "9365a3e4de9e668a1c2509dfa8abe0d4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}

let fahrenheitTemperature = null;

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelcius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

search("Los Angeles");
