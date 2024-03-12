let arrray = [[], [], []];

async function getLocationWeather(location) {
  let userLocation = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=95005ff1b5cc46719bd155353241003&q=${location}&days=3`,
    {
      mode: "cors",
    }
  );

  let json = await userLocation.json(); // (3)
  for (let i = 0; i < 3; i++) {
    arrray[i].push(json.forecast.forecastday[i].day.maxtemp_c);
    arrray[i].push(json.forecast.forecastday[i].day.mintemp_c);
    arrray[i].push(json.forecast.forecastday[i].day.daily_chance_of_rain);
    arrray[i].push(json.forecast.forecastday[i].day.avghumidity);
  }
  console.log(json.forecast.forecastday);
  console.log(arrray);
  arrray = [[], [], []];
}

getLocationWeather("belgium");

let submitButton = document.querySelector("#submit-location");
let userInput = document.querySelector("#user-input");

submitButton.addEventListener("click", () => {
  getLocationWeather(userInput.value);
  userInput.value = "";
});
