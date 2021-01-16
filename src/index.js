//Feature 1 - current day and time
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
  function displayMinutes() {
    if (currentMinutes < 10) {
      return `0${currentMinutes}`;
    } else {
      return `${currentMinutes}`;
    }
  }
  let announceDate = `${currentDay}, ${currentHours}:${displayMinutes()}`;
  return announceDate;
}
let liDate = document.querySelector("#date");
liDate.innerHTML = formatDate();


let searchedCity = document.querySelector("#searched-city");

function searchCity(event) {
  event.preventDefault();
  let heading = document.querySelector("h1");
  heading.innerHTML = `${searchedCity.value}`;
  let cityOfInterest = searchedCity.value;
  console.log(cityOfInterest);
  let apiKey = "83af440fa20a143bbf52e11211e7bfb3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityOfInterest}&appid=83af440fa20a143bbf52e11211e7bfb3&units=metric`;
  axios.get(`${apiUrl}&q=${cityOfInterest}`).then(showTempInCity);
}

function showTempInCity(response) {
  console.log(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let strong = document.querySelector("strong");
  strong.innerHTML = `${temperature}`;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = ` ${humidity}`;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = ` ${wind}`;
  let h6 = document.querySelector("h6");
  let description = response.data.weather[0].description;
  console.log(description);
  h6.innerHTML = `${description}`;
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

//Bonus Point - current location
function showTemperatureAndCity(response) {
  let temperatureEl = Math.round(response.data.main.temp);
  console.log(temperatureEl);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
  let h3 = document.querySelector("h3");
  h3.innerHTML = `${temperatureEl}`;
}
function getCoordinates(position) {
  let apiKey = "83af440fa20a143bbf52e11211e7bfb3";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
  axios
    .get(`${apiUrl}&appid=${apiKey}&lat=${lat}&lon=${lon}`)
    .then(showTemperatureAndCity);
}
function showPosition(position) {
  navigator.geolocation.getCurrentPosition(getCoordinates);
}
let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", showPosition);
