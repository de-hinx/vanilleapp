function country() {
  event.preventDefault();
  let searching = document.querySelector("#search-input");
  //alert(searching.value);
  let city = searching.value;
  let sheCode = "77bdfc047f054f23dabe6bdof740t2a3";
  let urlApi = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${sheCode}&units=metric`;

  axios.get(urlApi).then(weather);
}
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
  let newTemp = document.querySelector(".current-temperature");
  newTemp.innerHTML = Math.round(response.data.temperature.current);

  let changeHeader = document.querySelector(".current-city");
  changeHeader.innerHTML = response.data.city;
  //console.log(response.data.condition.description);
  let newCon = document.querySelector(".current-condition");
  newCon.innerHTML = response.data.condition.description;
}
