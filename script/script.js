const form = document.querySelector("#form");
const input = document.querySelector("#inputCity");
const sup = document.querySelector("#sup");

async function getWeather(city) {
  const apiKey = "65c713a3180c4ed489b125332232709";
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`;
  const response = await fetch(url);
  const data = await response.json();

  document.querySelector(".card__city").innerHTML = data.location.name;
  document.querySelector(".card__value").innerHTML =
    data.current.temp_c + '<sup id="sup">°c</sup>';
  document.querySelector(".information__item-humidity").innerHTML =
    data.current.humidity + "%";
  document.querySelector(".information__item-wind").innerHTML =
    Math.round(data.current.wind_kph / 3.6) + " м/с";
  document.querySelector(".information__item-precip").innerHTML =
    data.current.precip_mm + " мм";

  document.querySelector(".day__item-degrees").innerHTML =
    Math.round(data.current.temp_c) + "°";

  document.querySelector(".day-next__item-degrees").innerHTML =
    Math.round(data.forecast.forecastday[1].day.avgtemp_c) + "°";

  document.querySelector(".day-next-after__item-degrees").innerHTML =
    Math.round(data.forecast.forecastday[2].day.avgtemp_c) + "°";

  document.querySelector(".now").innerHTML = date.toLocaleString(
    "ru-RU",
    options
  );

  console.log(data);
}

form.onsubmit = async function (event) {
  event.preventDefault();
  const city = input.value.trim();
  const data = await getWeather(city);
};

const date = new Date();
let options = {
  weekday: "short",
};
