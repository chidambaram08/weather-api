const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');

const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

// Event listener for form submission
weatherForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a city name');
    }
});

// Function to fetch weather data from API
async function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const weatherData = await response.json();
        displayWeather(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('City not found. Please enter a valid city name.');
    }
}

// Function to display weather data
function displayWeather(data) {
    const { name, main, weather } = data;
    const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;

    const weatherHTML = `
        <p><strong>City:</strong> ${name}</p>
        <p><strong>Temperature:</strong> ${main.temp} &deg;C</p>
        <p><strong>Description:</strong> ${weather[0].description}</p>
        <img src="${iconUrl}" alt="Weather Icon">
    `;

    weatherResult.innerHTML = weatherHTML;
}
