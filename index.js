function country(event) {
  event.preventDefault();
  let searching = document.querySelector("#search-input");
  //alert(searching.value);
  //let cityNew = searching.value;
  search(searching.value);
}

function search(city) {
  let sheCode = "77bdfc047f054f23dabe6bdof740t2a3";
  let urlApi = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${sheCode}&units=metric`;

  axios.get(urlApi).then(weather);
}
search("Paris");

let formName = document.querySelector("form");

formName.addEventListener("submit", country);

//let recentTime = new Date();
function theTime(recentTime) {
  let dates = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let date = dates[recentTime.getDay()];
  let hour = recentTime.getHours();
  let min = recentTime.getMinutes();
  if (min < 10) {
    min = `0${min}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }
  return `${date} ${hour}:${min}`;
}
let currentTime = theTime(new Date());
let time = document.querySelector("#current-date");
time.innerHTML = currentTime;

function weather(response) {
  let newTemp = document.querySelector("#current-temperature");
  if (response.data.temperature.current < 10) {
    newTemp.innerHTML = `0${Math.round(response.data.temperature.current)}`;
  } else {
    newTemp.innerHTML = Math.round(response.data.temperature.current);
  }

  let changeHeader = document.querySelector(".current-city");
  changeHeader.innerHTML = response.data.city;
  console.log(response.data);
  let newCon = document.querySelector(".current-condition");
  newCon.innerHTML = response.data.condition.description;
  let newHumidity = document.querySelector(".number");
  newHumidity.innerHTML = response.data.temperature.humidity;
  let newWindSpeed = document.querySelector(".wind-speed");
  newWindSpeed.innerHTML = response.data.wind.speed;

  let newIcon = document.querySelector("#icon");
  newIcon.innerHTML = `<img
                src="${response.data.condition.icon_url}"
                class="current-temperature-icon" />`;
  forecast(response.data.city);
}
function forecast(city) {
  let apiKey = "77bdfc047f054f23dabe6bdof740t2a3";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
  console.log(axios.get(apiUrl));
}

function displayDay(timestamp) {
  let day = new Date(timestamp * 1000);
  let days = ["sun", "Mon", "Tues", "Wed", "thurs", "fri", "sat"];
  return days[day.getDay()];
}
function displayForecast(display) {
  let forecastHtml = "";

  display.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml += `<div class="days">
              <div class="day">${displayDay(day.time)}</div>
              <div ><img src="${day.condition.icon_url}" class="emoji" /></div>
              <div class="degrees">
                <span class="degree"><strong>${Math.round(
                  day.temperature.maximum
                )}°</strong></span
                ><span class="degree">${Math.round(
                  day.temperature.minimum
                )}°</span>
              </div>
            </div>`;
    }
  });
  let weatherForecast = document.querySelector(".forecast");
  weatherForecast.innerHTML = forecastHtml;
}
// displayForecast();
