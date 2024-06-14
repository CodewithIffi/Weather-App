
const apiKey = 'b60f7ca13413afe29cda3aff5eff10ca';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
      if (!city) {
        console.error('City input is empty or undefined');
        return;
      }
  
      const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
      const data = await response.json();
  
      if (data && data.main) {
        const temp = data.main.temp;
        const humidity = data.main.humidity;
        const wind = data.wind.speed;
  
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = `${temp}°C`;
        document.querySelector(".humidity").innerHTML = `${humidity}%`;
        document.querySelector(".wind").innerHTML = `${wind}km/h`;
  
        if (data && data.weather && data.weather.length > 0) {
          const weatherMain = data.weather[0].main;
          if (weatherMain === "Clouds") {
            weatherIcon.src = "images/clouds.png";
          } else if (weatherMain === "Clear") {
            weatherIcon.src = "images/clear.png";
          } else if (weatherMain === "Rain") {
            weatherIcon.src = "images/rain.png";
          } else if (weatherMain === "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
          } else if (weatherMain === "Mist") {
            weatherIcon.src = "images/mist.png";
          }
        } else {
          console.error('Invalid API response or no weather data');
        }
      } else {
        console.error('Invalid API response');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    checkWeather(city);
});

