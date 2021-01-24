function formatDate(date) {
  let currentTime = new Date();
  let currentHours = currentTime.getHours();
  let currentMinutes = currentTime.getMinutes();
  let currentDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let currentDay = currentDays[currentTime.getDay()];
  
    function displayHours(hours){
      if(currentHours<10){
        return `0${currentHours}`;
      }
      else {
        return `${currentHours}`;
      }
    }
    function displayMinutes(minutes) {
      if (currentMinutes < 10) {
        return `0${currentMinutes}`;
      } 
      else {
      return `${currentMinutes}`;
      }
    }
  let announceDate = `${currentDay}, ${displayHours()}:${displayMinutes()}`;
  return announceDate;
}

let dateElement = document.querySelector("#date");
dateElement.innerHTML = formatDate();

function formatHours(timestamp){
  let currentTime = new Date(timestamp);
  let currentHours = currentTime.getHours();
  if(currentHours<10){
    currentHours=`0${currentHours}`;
  }
  let currentMinutes = currentTime.getMinutes();
  if (currentMinutes < 10) {
      currentMinutes=`0${currentMinutes}`;
    } 
  return `${currentHours}:${currentMinutes}`;
}

function displayForecast(response){
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML=null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
  forecast = response.data.list[index];
  forecastElement.innerHTML+=`
    <div class="col-2">
        <h3>
            ${formatHours(forecast.dt*1000)}
        </h3>
        <img 
            src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt=""
        />
        <div class="weather-forecast-temp">
            <strong>
                ${Math.round(forecast.main.temp_max)}°
            </strong>
               ${Math.round(forecast.main.temp_min)}°
         </div>
    </div>`; 
  }   
}

let searchedCity = document.querySelector("#searched-city");

function searchCity(event) {
  event.preventDefault();
  let h1 = document.querySelector("h1");
  let cityOfInterest = searchedCity.value;
  let apiKey = "83af440fa20a143bbf52e11211e7bfb3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityOfInterest}&appid=83af440fa20a143bbf52e11211e7bfb3&units=metric`;
  h1.innerHTML = `${searchedCity.value}`;
  axios.get(`${apiUrl}&q=${cityOfInterest}`).then(showTempInCity);
  apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${cityOfInterest}&appid=83af440fa20a143bbf52e11211e7bfb3&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTempInCity(response) {
  celsiusTemperature=response.data.main.temp;
  let temperature = Math.round(celsiusTemperature);
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let strong = document.querySelector("strong");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let h6 = document.querySelector("h6");
  let description = response.data.weather[0].description;
  let iconElement=document.querySelector("#icon");
  let iconImage=response.data.weather[0].icon;
  strong.innerHTML = `${temperature}`;
  humidityElement.innerHTML = ` ${humidity}`;
  windElement.innerHTML = ` ${wind}`;
  h6.innerHTML = `${description}`;
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${iconImage}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

function showCurrentLocation(response){
  let h1=document.querySelector("h1");
  h1.innerHTML=response.data.name;
}
function getCoordinates(position) {
  let apiKey = "83af440fa20a143bbf52e11211e7bfb3";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = "http://api.openweathermap.org/data/2.5/weather?units=metric";
  axios
    .get(`${apiUrl}&appid=${apiKey}&lat=${lat}&lon=${lon}`)
    .then(showTempInCity);
  axios
    .get(`${apiUrl}&appid=${apiKey}&lat=${lat}&lon=${lon}`)
    .then(showCurrentLocation); 
  apiUrl=`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=83af440fa20a143bbf52e11211e7bfb3&units=metric`;
  axios.get(apiUrl).then(displayForecast); 
  }
function getCurrentPosition(position) {
  navigator.geolocation.getCurrentPosition(getCoordinates);
}

window.onload = getCurrentPosition;

function displayFahrenheitTemp(event){
  event.preventDefault();
  let fahrenheitTemperature=(celsiusTemperature*9)/5+32;
  let temperatureElement=document.querySelector("#temp");
  temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayCelsiusTemp(event){
  event.preventDefault();
  let temperatureElement=document.querySelector("#temp");
  temperatureElement.innerHTML=Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}
let celsiusTemperature=null;

let fahrenheitLink=document.querySelector("#degree-in-fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink=document.querySelector("#degree-in-celsius");
celsiusLink.addEventListener("click", displayCelsiusTemp);