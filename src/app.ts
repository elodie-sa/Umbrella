const apiKey = 'da90a4407d688c949601becf143335a2'; // Remplace par ta clé API de météo
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

const getWeatherData = async (city: string) => {
  try {
    const response = await axios.get(weatherUrl, {
      params: {
        q: city,
        appid: apiKey,
        units: 'metric' // Données en degrés Celsius
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données météo :', error);
    return null;
  }
};

// Fonction pour déterminer si un parapluie est nécessaire
const needUmbrella = (weatherData: any): string => {
  const weatherConditions = weatherData.weather[0].main.toLowerCase();
  if (weatherConditions.includes("rain") || weatherConditions.includes("drizzle") || weatherConditions.includes("snow")) {
    return "Oui";
  } else {
    return "Non";
  }
};

const displayWeather = (weatherData: any) => {
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
  } else if (weatherResult) {
    weatherResult.innerHTML = `<p>City not found.</p>`;
  }
};

const setup = () => {
  const getWeatherButton = document.getElementById('getWeather');
  const cityInput = document.getElementById('city') as HTMLInputElement;

  getWeatherButton?.addEventListener('click', async () => {
    const city = cityInput.value;
    if (city) {
      const weatherData = await getWeatherData(city);
      displayWeather(weatherData);
    }
  });
};

setup();
