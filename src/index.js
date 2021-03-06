function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours() % 12 || 12;

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  let day = days[date.getDay()];
  let ampm = date.getHours() < 12 ? "AM" : "PM";
  return `${day} ${hours}:${minutes} ${ampm}`;
}
function formatSunriseSunset(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours() % 12 || 12;
  let ampm = date.getHours() < 12 ? "AM" : "PM";

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes} ${ampm}`;
}
function formatForcast(timestamp) {
  let date = new Date(timestamp);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let day = days[date.getDay()];
  return `${day}`;
}
function showTemperature(response) {
  console.log(response);
  let cityElement = document.querySelector("#city");
  let mainTemp = document.querySelector("#main-temp");
  let minTemp = document.querySelector("#min-temp");
  let maxTemp = document.querySelector("#max-temp");
  let currentCondition = document.querySelector("#weather-description");
  let iconElement = document.querySelector("#icon");
  let humidElement = document.querySelector("#humidity");
  let sunriseElement = document.querySelector("#sunrise");
  let sunsetElement = document.querySelector("#sunset");
  let dateElement = document.querySelector("#date");
  let windElement = document.querySelector("#wind");

  cityElement.innerHTML = response.data.name;
  mainTemp.innerHTML = Math.round(response.data.main.temp);
  minTemp.innerHTML = Math.round(response.data.main.temp_min);
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);
  currentCondition.innerHTML = response.data.weather[0].description;
  humidElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  sunriseElement.innerHTML = formatSunriseSunset(
    response.data.sys.sunrise * 1000
  );
  sunsetElement.innerHTML = formatSunriseSunset(
    response.data.sys.sunset * 1000
  );
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForcast(response.data.coord);
}

function showCurrentPosition(response) {
  let cityElement = document.querySelector("#city");
  let mainTemp = document.querySelector("#main-temp");
  let minTemp = document.querySelector("#min-temp");
  let maxTemp = document.querySelector("#max-temp");
  let currentCondition = document.querySelector("#weather-description");
  let iconElement = document.querySelector("#icon");
  let humidElement = document.querySelector("#humidity");
  let dateElement = document.querySelector("#date");
  let windElement = document.querySelector("#wind");
  let sunriseElement = document.querySelector("#sunrise");
  let sunsetElement = document.querySelector("#sunset");

  cityElement.innerHTML = response.data.name;
  mainTemp.innerHTML = Math.round(response.data.main.temp);
  minTemp.innerHTML = Math.round(response.data.main.temp_min);
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);
  currentCondition.innerHTML = response.data.weather[0].description;
  humidElement.innerHTML = response.data.main.humidity;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  sunriseElement.innerHTML = formatSunriseSunset(
    response.data.sys.sunrise * 1000
  );
  sunsetElement.innerHTML = formatSunriseSunset(
    response.data.sys.sunset * 1000
  );
  getForcast(response.data.coord);
}
function retrievePosition(position) {
  let apiKey = "9365a3e4de9e668a1c2509dfa8abe0d4";
  let unit = "&units=imperial";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}${unit}`;
  axios.get(url).then(showCurrentPosition);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function displayForcast(response) {
  console.log(response);
  let forcastElement = document.querySelector("#forcast");
  let forcastHTML = `<div class="row">`;
  let forcast = response.data.daily;
  timezone = response.data.timezone_offset;
  forcast.forEach(function (forcastDay, index) {
    if (index > 0 && index < 6) {
      forcastHTML =
        forcastHTML +
        `<div class="col-2">
        <div class="box">
          <div class="forcast-day"><strong>${formatForcast(
            forcastDay.dt * 1000
          )}</strong></div>
            <img src="http://openweathermap.org/img/wn/${
              forcastDay.weather[0].icon
            }@2x.png" class="icon" alt=".." id="icon" />
              <div class="forcast">
                <span class="daily-high" id="day-high"><strong>${Math.round(
                  forcastDay.temp.max
                )}??</strong></span>
                <span class="daily-low" id="day-low">/${Math.round(
                  forcastDay.temp.min
                )}??</span>
                  </div>
              </div>
            </div>`;
      forcastHTML = forcastHTML + `</div>`;
      forcastElement.innerHTML = forcastHTML;
    }
  });
}
function getForcast(coordinates) {
  let apiKey = "9365a3e4de9e668a1c2509dfa8abe0d4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForcast);
}

function search(city) {
  let apiKey = "9365a3e4de9e668a1c2509dfa8abe0d4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}

function searchCity(event) {
  event.preventDefault();
  let searchElement = document.querySelector("#search-input");
  search(searchElement.value);
}

let forcast = null;
let timezone = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let positionButton = document.querySelector("#button-addon1");
positionButton.addEventListener("click", getCurrentPosition);

search("Los Angeles");
