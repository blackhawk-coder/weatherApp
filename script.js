const apiKey = 'dd0446a2ca9ff814b8f3afd839b69cdd'
const searchButton = document.querySelector('.js-searchButton');

async function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    console.log(apiUrl);
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        console.log(data); // Check if `data` is structured as expected

        // Ensure that `data.main` exists before accessing it
        if (!data.main) {
            throw new Error("Weather data not available for the city");
        }

        // Update DOM with the weather data
        document.querySelector('.js-city').innerHTML = data.name;
        document.querySelector('.js-temp').innerHTML = Math.round(data.main.temp) + '°C';
        document.querySelector('.js-weather').innerHTML = data.weather[0].main;
        document.querySelector('.js-wind').innerHTML = data.wind.speed + 'km/h';
        document.querySelector('.js-humidity').innerHTML = data.main.humidity + '%';

        // Weather icon logic (ensure icons are set based on weather)
        const weatherIcon = document.getElementById('WeatherIcon');
        if (data.weather[0].main == 'Clouds') {
            weatherIcon.src = 'images/cloudy.png';
        } else if (data.weather[0].main == 'Clear') {
            weatherIcon.src = 'images/sun.png';
        } else if (data.weather[0].main == 'Rain') {
            weatherIcon.src = 'images/rainy-day.png';
        } else if (data.weather[0].main == 'Mist') {
            weatherIcon.src = 'images/mist.png';
        }

    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.querySelector('.js-city').innerHTML = "City not found";
        // Clear other fields if no valid data
        document.querySelector('.js-temp').innerHTML = "--";
        document.querySelector('.js-weather').innerHTML = "--";
        document.querySelector('.js-wind').innerHTML = "-- km/h";
        document.querySelector('.js-humidity').innerHTML = "-- %";
    }
}

// Add event listener to search button
searchButton.addEventListener('click', () => {
    const searchBar = document.querySelector('.js-searchBar').value;
    console.log(searchBar);
    getWeather(searchBar);
});

// Optionally, call getWeather initially
getWeather('Nairobi'); // Default city for initial weather load
