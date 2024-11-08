"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const apiKey = 'da90a4407d688c949601becf143335a2'; // Remplace par ta clé API de météo
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
const getWeatherData = (city) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios.get(weatherUrl, {
            params: {
                q: city,
                appid: apiKey,
                units: 'metric' // Données en degrés Celsius
            }
        });
        return response.data;
    }
    catch (error) {
        console.error('Erreur lors de la récupération des données météo :', error);
        return null;
    }
});
// Fonction pour déterminer si un parapluie est nécessaire
const needUmbrella = (weatherData) => {
    const weatherConditions = weatherData.weather[0].main.toLowerCase();
    if (weatherConditions.includes("rain") || weatherConditions.includes("drizzle") || weatherConditions.includes("snow")) {
        return "Yes, you should take an umbrella!";
    }
    else {
        return "No, you don't need an umbrella.";
    }
};
const displayWeather = (weatherData) => {
    const weatherResult = document.getElementById('weatherResult');
    if (weatherResult && weatherData) {
        const { name, main, weather } = weatherData;
        const umbrellaMessage = needUmbrella(weatherData); // Appel de la fonction
        weatherResult.innerHTML = `
      <h2>Weather in ${name}</h2>
      <p>Temperature: ${main.temp}°C</p>
      <p>Condition: ${weather[0].description}</p>
      <p><strong>${umbrellaMessage}</strong></p>
    `;
    }
    else if (weatherResult) {
        weatherResult.innerHTML = `<p>City not found.</p>`;
    }
};
const setup = () => {
    const getWeatherButton = document.getElementById('getWeather');
    const cityInput = document.getElementById('city');
    getWeatherButton === null || getWeatherButton === void 0 ? void 0 : getWeatherButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
        const city = cityInput.value;
        if (city) {
            const weatherData = yield getWeatherData(city);
            displayWeather(weatherData);
        }
    }));
};
setup();
