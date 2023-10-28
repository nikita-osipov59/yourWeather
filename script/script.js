const form = document.querySelector("#form");
const input = document.querySelector("#inputCity");
const sup = document.querySelector("#sup");

async function getWeather(city) {
  let query = city !== null ? city : "Москва";
  const apiKey = "65c713a3180c4ed489b125332232709";
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=7`;
  const response = await fetch(url);
  const data = await response.json();

  document.querySelector(".card__city").innerHTML = data.location.name;

  document.querySelector(".card__value").innerHTML =
    Math.round(data.current.temp_c) + '<sup id="sup">°c</sup>';
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
  document.querySelector(".next").innerHTML = tomorrowDay();

  document.querySelector(".after-next").innerHTML = afterTomorrowDay();
  console.log(data);

  const WeatherData = {
    condition: data.current.condition.text,
  };

  const getImage = (condition) => {
    switch (condition) {
      case "Overcast":
        return "images/overcast.png";
      case "Cloud":
        return "images/cloud.png";
      case "Fog":
        return "images/fog.png";
      case "Partly cloudy":
        return "images/partly.png";
      case "Cloudy":
        return "images/partly.png";
      case "Moderate snow":
        return "images/snow.png";
      case "Sunny":
        return "images/sun.png";
      case "Light rain":
        return "images/light rain.png";
      case "Clear":
        return "images/sun.png";
      case "Patchy rain possible":
        return "images/light rain.png";
      case "Mist":
        return "images/Fog.png";
      case "Heavy snow":
        return "images/snow.png";
      case "Moderate or heavy snow showers":
        return "images/snow.png";
      case "Light snow":
        return "images/snow.png";
      case "Freezing drizzle":
        return "images/light rain.png";
      case "Light freezing rain":
        return "images/light rain.png";
      default:
        return "images/unknown.png";
    }
  };
  document.querySelector(".card__photo").src = getImage(WeatherData.condition);

  if (data.current.is_day == 0) {
    document.querySelector("body").style.cssText =
      "background-image: url(../images/back-light.jpg)";
  } else {
    document.querySelector("body").style.cssText =
      "background-image: url(../images/back-dark.jpg)";
    document.querySelector("body").classList.add("night");
  }
}

form.onsubmit = async function (event) {
  event.preventDefault();
  const city = input.value.trim();
  localStorage.setItem("query", city);
  const data = await getWeather(city);
};

getWeather(localStorage.getItem("query"));

const date = new Date();
let options = {
  weekday: "short",
};

const tomorrowDay = () => {
  const day = new Date();
  day.setDate(day.getDate() + 1);

  const tomorrow = day.getDay();
  const dayTitle = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];

  return `${dayTitle[tomorrow]}`;
};

const afterTomorrowDay = () => {
  const day = new Date();
  day.setDate(day.getDate() + 2);

  const afterTomorrow = day.getDay();
  const dayTitle = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];

  return `${dayTitle[afterTomorrow]}`;
};
