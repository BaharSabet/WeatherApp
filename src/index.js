let apiKey = "9154daef331ecbea43e8a26eb1a85f04";
let unit = "metric";

let currentTime = new Date();
function formatTime(currentDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[currentDate.getDay()];
  let hour = currentDate.getHours();
  let minute = currentDate.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  //console.log(typeof minute);
  return `${day}, ${hour}:${minute}`;
}
let todayDay = document.querySelector(".current-time");
todayDay.innerHTML = formatTime(currentTime);

function formatDate(currentDate) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let month = months[currentDate.getMonth()];
  let date = currentDate.getDate();
  let year = currentDate.getFullYear();
  return `${month} ${date}, ${year}`;
}
let todayDate = document.querySelector(".today-date");
todayDate.innerHTML = formatDate(currentTime);

function showTemp(response) {
  let temperature = document.querySelector("#temp");
  let wind = document.querySelector("#wind-speed");
  let humidity = document.querySelector("#humidity");
  let temp = Math.round(response.data.main.temp);
  let windSpeed = Math.round(response.data.wind.speed);
  let windUnit = document.querySelector("#wind-unit");
  let mainHumidity = Math.round(response.data.main.humidity);
  temperature.innerHTML = temp;
  wind.innerHTML = windSpeed;
  humidity.innerHTML = mainHumidity;
  if (unit === "Imperial") {
    windUnit.innerHTML = "mph";
  } else {
    windUnit.innerHTML = "km/h";
  }
  console.log(response);
  return temp;
}

var indiaTime = new Date().toLocaleString("en-US", {
  timeZone: "Asia/Kolkata"
});
console.log("India time: " + new Date(indiaTime).toISOString());

function showCurrentTemp(city, unit) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(url).then(showTemp);
}

function readCity() {
  let searchedCity = document.querySelector("#searched-city");
  let enteredCity = searchedCity.value.trim();
  return enteredCity;
}
function showCity(event) {
  event.preventDefault();
  let enteredCity = readCity();
  let city = document.querySelector(".city");
  if (enteredCity) {
    city.innerHTML = `${enteredCity.toUpperCase()}`;
  } else {
    alert("Please enter a city.");
  }
  unit = "metric";
  showCurrentTemp(enteredCity, unit);
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", showCity);

function showPlace(response) {
  let place = response.data.name;
  let city = document.querySelector(".city");
  city.innerHTML = place.toUpperCase();
  showTemp(response);
}

function getPosition(position) {
  let lat = position.coords.latitude;
  //console.log(lat);
  let lon = position.coords.longitude;
  //console.log(lon);
  unit = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${apiKey}`;
  axios.get(url).then(showPlace);
}

function showCurrent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

let current = document.querySelector(".current-button");
current.addEventListener("click", showCurrent);

let celsius = document.querySelector("#celsius-link");
let fahrenheit = document.querySelector("#fahrenheit-link");
celsius.addEventListener("click", function(event) {
  unit = "metric";
  let newCity = readCity();
  showCurrentTemp(newCity, unit);
});
fahrenheit.addEventListener("click", function(event) {
  unit = "Imperial";
  let newCity = readCity();
  showCurrentTemp(newCity, unit);
});

let comingDays = document.querySelectorAll(".next-day");
//console.log(comingDays[0]);
let dayCounter = currentTime.getDay();
let monthCounter = currentTime.getMonth() + 1;
let dateCounter = currentTime.getDate();
for (const [key] of Object.entries(comingDays)) {
  let futureDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  dayCounter = dayCounter + 1;
  if (dayCounter > 6) {
    dayCounter = 0;
  }
  dateCounter = dateCounter + 1;
  if (
    monthCounter === 1 ||
    monthCounter === 3 ||
    monthCounter === 5 ||
    monthCounter === 7 ||
    monthCounter === 8 ||
    monthCounter === 10 ||
    monthCounter === 12
  ) {
    if (dateCounter > 31) {
      dateCounter = 1;
      monthCounter = monthCounter + 1;
    }
  }

  if (
    monthCounter === 4 ||
    monthCounter === 6 ||
    monthCounter === 9 ||
    monthCounter === 11
  ) {
    if (dateCounter > 30) {
      dateCounter = 1;
      monthCounter = monthCounter + 1;
    }
  }

  if (monthCounter === 2) {
    if (dateCounter > 28) {
      dateCounter = 1;
      monthCounter = monthCounter + 1;
    }
  }

  let day = futureDays[dayCounter];
  let futureDay = comingDays[key];
  futureDay.innerHTML = `${day}, ${monthCounter}/${dateCounter}`;
}
