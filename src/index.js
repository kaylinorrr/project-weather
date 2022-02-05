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

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let mainTemp = document.querySelector("#main-temp");
  mainTemp.innerHTML = `${temperature}`;
  let min = Math.round(response.data.main.temp_min);
  let max = Math.round(response.data.main.temp_max);
  let minMaxTemp = document.querySelector("#temp-2");
  minMaxTemp.innerHTML = `${max}º/${min}º`;
  let description = response.data.weather.value;
  let currentCondition = document.querySelector("#weather-description");
  currentCondition.innerHTML = `${description}`;
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
  let description = response.data.weather.value;
  let currentCondition = document.querySelector("#weather-description");
  currentCondition.innerHTML = `${description}`;
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
