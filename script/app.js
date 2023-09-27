const header = document.querySelector("header");
const form = document.querySelector("#form");
const input = document.querySelector("#inputCity");

function removeCard() {
  const prevCard = document.querySelector(".card");
  if (prevCard) prevCard.remove();
}
function showError(errorMessage) {
  const html = `<div class="card">${errorMessage}</div>`;
  header.insertAdjacentHTML("afterend", html);
}

function getImage(condition) {
  switch (condition) {
    case "Overcast":
      return "images/overcast.png";
    case "Cloud":
      return "images/cloyd.png";
    case "Fog":
      return "images/fog.png";
    case "Partly cloudy":
      return "images/partly.png";
    case "Sunny":
      return "images/sunny.png";
    case "Light rain":
      return "images/light rain.png";

    default:
      return "images/the.png";
  }
}

function showCard(WeatherData) {
  const html = `
        <div class="card">
            <h2 class="card-city">${WeatherData.name}<span>${
    WeatherData.country
  }</span></h2>

            <div class="card-weather">
                <div class="card-value">${WeatherData.temp}<sup>°c</sup></div>
                <img class="card-img" src="${getImage(
                  WeatherData.condition
                )}" alt="Weather" />
            </div>

            <div class="card-description">${WeatherData.condition}</div>
        </div>
        `;
  header.insertAdjacentHTML("afterend", html);
}

async function getWeather(city) {
  const apiKey = "65c713a3180c4ed489b125332232709";
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}

form.onsubmit = async function (event) {
  event.preventDefault();
  const city = input.value.trim();
  const data = await getWeather(city);

  if (data.error) {
    removeCard();
    showError(data.error.message);
  } else {
    removeCard();

    const WeatherData = {
      name: data.location.name,
      country: data.location.country,
      temp: data.current.temp_c,
      condition: data.current.condition.text,
      isDay: data.current.is_day,
    };
    showCard(WeatherData);
  }
};
