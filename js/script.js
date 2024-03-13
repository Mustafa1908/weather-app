let locationArray = [
  [],
  [],
  [],
  [],
  [],
  [
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
    "December",
  ],
  [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
];

let weatherPredictionArray = [[], [], []];

async function getLocationWeather(location) {
  try {
    let errorMessage = document.querySelector(".error-message");
    errorMessage.innerText = "";
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
    }

    for (let i = 0; i < 23; i++) {
      locationArray[3].push(weatherJson.forecast.forecastday[0].hour[i]);
      weatherPredictionArray[0].push([]);
      weatherPredictionArray[1].push([]);
      weatherPredictionArray[2].push([]);
    }

    for (let i = 0; i < 23; i++) {
      weatherPredictionArray[0][i].push(
        weatherJson.forecast.forecastday[0].hour[i].chance_of_rain
      );
      weatherPredictionArray[1][i].push(
        weatherJson.forecast.forecastday[0].hour[i].chance_of_snow
      );
      weatherPredictionArray[2][i].push(
        weatherJson.forecast.forecastday[0].hour[i].cloud
      );

      weatherPredictionArray[0][i].push(
        weatherJson.forecast.forecastday[1].hour[i].chance_of_rain
      );
      weatherPredictionArray[1][i].push(
        weatherJson.forecast.forecastday[1].hour[i].chance_of_snow
      );
      weatherPredictionArray[2][i].push(
        weatherJson.forecast.forecastday[1].hour[i].cloud
      );

      weatherPredictionArray[0][i].push(
        weatherJson.forecast.forecastday[2].hour[i].chance_of_rain
      );
      weatherPredictionArray[1][i].push(
        weatherJson.forecast.forecastday[2].hour[i].chance_of_snow
      );
      weatherPredictionArray[2][i].push(
        weatherJson.forecast.forecastday[2].hour[i].cloud
      );
    }

    locationArray[0].push(
      weatherJson.forecast.forecastday[0].day.daily_chance_of_rain
    );

    locationArray[4].push(weatherJson.location.name);
  } catch (error) {
    let errorMessage = document.querySelector(".error-message");
    errorMessage.innerText = "Enter a valid location name";
  }
}

renderWeatherInformations("belgium");

let submitButton = document.querySelector("#submit-location");
let userInput = document.querySelector("#user-input");

submitButton.addEventListener("click", () => {
  renderWeatherInformations(userInput.value);
});

async function renderWeatherInformations(userInput) {
  await getLocationWeather(userInput);
  userInput.value = "";

  let errorMessage = document.querySelector(".error-message");

  if (errorMessage.innerText === "Enter a valid location name") {
    return;
  }

  renderDaysWeatherInformation();
  renderTodayWeatherInformations();
  renderWeatherIcon();

  locationArray = [
    [],
    [],
    [],
    [],
    [],
    [
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
      "December",
    ],
    [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  ];

  weatherPredictionArray = [[], [], []];
}

function renderDaysWeatherInformation() {
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

  let currentDate = new Date();

  thirdDayMaximumDegrees.innerText = locationArray[2][0] + "°";
  thirdDayMinimumDegrees.innerText = locationArray[2][1] + "°";

  let firstDay = document.querySelector(".first-day");
  firstDay.innerText = locationArray[6][currentDate.getDay() - 1];

  let secondDay = document.querySelector(".second-day");
  secondDay.innerText = locationArray[6][currentDate.getDay()];

  let thirdDay = document.querySelector(".third-day");
  thirdDay.innerText = locationArray[6][currentDate.getDay() + 1];
}

function renderWeatherIcon() {
  let currentDate = new Date();
  let firstDayWeatherPrediction = document.querySelector(
    ".first-day-weather-prediction"
  );

  if (weatherPredictionArray[0][currentDate.getHours()][0] > 50) {
    firstDayWeatherPrediction.innerHTML = `<span class="material-symbols-outlined first-day-weather-prediction">
    rainy
    </span>`;
  } else if (weatherPredictionArray[0][currentDate.getHours()][1] > 50) {
    firstDayWeatherPrediction.innerHTML = `<span class="material-symbols-outlined first-day-weather-prediction">
    weather_snowy
    </span>`;
  } else if (weatherPredictionArray[0][currentDate.getHours()][2] > 50) {
    firstDayWeatherPrediction.innerHTML = `<span class="material-symbols-outlined first-day-weather-prediction">
    cloud
    </span>`;
  } else {
    firstDayWeatherPrediction.innerHTML = `<span class="material-symbols-outlined first-day-weather-prediction">
    wb_sunny
    </span>`;
  }

  let secondDayWeatherPrediction = document.querySelector(
    ".second-day-weather-prediction"
  );

  if (weatherPredictionArray[1][currentDate.getHours()][0] > 50) {
    secondDayWeatherPrediction.innerHTML = `<span class="material-symbols-outlined first-day-weather-prediction">
    rainy
    </span>`;
  } else if (weatherPredictionArray[1][currentDate.getHours()][1] > 50) {
    secondDayWeatherPrediction.innerHTML = `<span class="material-symbols-outlined first-day-weather-prediction">
    weather_snowy
    </span>`;
  } else if (weatherPredictionArray[1][currentDate.getHours()][2] > 50) {
    secondDayWeatherPrediction.innerHTML = `<span class="material-symbols-outlined first-day-weather-prediction">
    cloud
    </span>`;
  } else {
    secondDayWeatherPrediction.innerHTML = `<span class="material-symbols-outlined first-day-weather-prediction">
    wb_sunny
    </span>`;
  }

  let thirdDayWeatherPrediction = document.querySelector(
    ".third-day-weather-prediction"
  );

  if (weatherPredictionArray[2][currentDate.getHours()][0] > 50) {
    thirdDayWeatherPrediction.innerHTML = `<span class="material-symbols-outlined first-day-weather-prediction">
    rainy
    </span>`;
  } else if (weatherPredictionArray[2][currentDate.getHours()][1] > 50) {
    thirdDayWeatherPrediction.innerHTML = `<span class="material-symbols-outlined first-day-weather-prediction">
    weather_snowy
    </span>`;
  } else if (weatherPredictionArray[2][currentDate.getHours()][2] > 50) {
    thirdDayWeatherPrediction.innerHTML = `<span class="material-symbols-outlined first-day-weather-prediction">
    cloud
    </span>`;
  } else {
    thirdDayWeatherPrediction.innerHTML = `<span class="material-symbols-outlined first-day-weather-prediction">
    wb_sunny
    </span>`;
  }
}

function renderTodayWeatherInformations() {
  let dailyChanceOfRain = document.querySelector(".daily-chance-of-rain");
  dailyChanceOfRain.innerText = locationArray[0][2] + "%";

  let currentDate = new Date();
  let currentHour = currentDate.getHours();

  let degreesFeelsLike = document.querySelector(".degrees-feels-like");
  degreesFeelsLike.innerText = locationArray[3][currentHour].feelslike_c;

  let currentWindSpeed = document.querySelector(".current-wind-speed");
  currentWindSpeed.innerText = locationArray[3][currentHour].gust_mph;

  let currentTemperature = document.querySelector(".current-degrees");
  currentTemperature.innerText = locationArray[3][currentHour].temp_c + "°";

  let currentLocation = document.querySelector(".current-location");
  currentLocation.innerText = locationArray[4];

  let currentDay = document.querySelector(".current-date");
  currentDay.innerText =
    locationArray[6][currentDate.getDay() - 1] +
    " " +
    locationArray[5][currentDate.getMonth()] +
    " " +
    currentDate.getDate();
}
