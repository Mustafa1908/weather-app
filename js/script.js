let locationArray = [[], [], []];

async function getLocationWeather(location) {
  let userLocation = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=95005ff1b5cc46719bd155353241003&q=${location}&days=3`,
    {
      mode: "cors",
    }
  );

  let weatherJson = await userLocation.json();
  for (let i = 0; i < 3; i++) {
    locationArray[i].push(weatherJson.forecast.forecastday[i].day.maxtemp_c);
    locationArray[i].push(weatherJson.forecast.forecastday[i].day.mintemp_c);
    locationArray[i].push(
      weatherJson.forecast.forecastday[i].day.daily_chance_of_rain
    );
    locationArray[i].push(weatherJson.forecast.forecastday[i].day.avghumidity);
  }
  console.log(locationArray);
}

let submitButton = document.querySelector("#submit-location");
let userInput = document.querySelector("#user-input");

submitButton.addEventListener("click", async () => {
  await getLocationWeather(userInput.value);
  userInput.value = "";

  let firstDayMaximumDegrees = document.querySelector(
    ".first-day-maximum-degrees"
  );
  let firstDayMinimumDegrees = document.querySelector(
    ".first-day-minimum-degrees"
  );

  firstDayMaximumDegrees.innerText = locationArray[0][0] + "°";
  firstDayMinimumDegrees.innerText = locationArray[0][1] + "°";

  let secondDayMaximumDegrees = document.querySelector(
    ".second-day-maximum-degrees"
  );
  let secondDayMinimumDegrees = document.querySelector(
    ".second-day-minimum-degrees"
  );

  secondDayMaximumDegrees.innerText = locationArray[1][0] + "°";
  secondDayMinimumDegrees.innerText = locationArray[1][1] + "°";

  let thirdDayMaximumDegrees = document.querySelector(
    ".third-day-maximum-degrees"
  );
  let thirdDayMinimumDegrees = document.querySelector(
    ".third-day-minimum-degrees"
  );

  thirdDayMaximumDegrees.innerText = locationArray[2][0] + "°";
  thirdDayMinimumDegrees.innerText = locationArray[2][1] + "°";

  locationArray = [[], [], []];
});
