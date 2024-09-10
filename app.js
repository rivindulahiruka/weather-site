const input = document.getElementById("city-input");
const currentLocation = document.getElementById("current-location");
const tem = document.getElementById("temperature");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const sunRise = document.getElementById("sunrise");
const fTemp = document.getElementById("fTemp");
const sTemp = document.getElementById("sTemp");
const tTemp = document.getElementById("tTemp");
const fIcon = document.getElementById("fIcon");
const sIcon = document.getElementById("sIcon");
const tIcon = document.getElementById("tIcon");
const fDate = document.getElementById("fdate");
const sDate = document.getElementById("sdate");
const tDate = document.getElementById("tdate");
const currentTemp = document.getElementById("current-temp");
const currentCondition = document.getElementById("current-condition");
const localTime = document.getElementById("local-time");



const apiKey = '25753d530ba8432190e143957243008';

window.onload = function() {
    geolocation();
};

function getWeather(location) {
    const weatherAPI = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;
    
    fetch(weatherAPI)
        .then(res => res.json())
        .then(data => {
            currentLocation.textContent = `${data.location.name}`;
            tem.textContent = `${data.current.temp_c}°C`;
            wind.textContent = `${data.current.wind_kph} km/h`;
            humidity.textContent = `${data.current.humidity}%`;
            currentTemp.textContent = `${data.current.temp_c}°C`;
            currentCondition.textContent = `${data.current.condition.text}`;
            localTime.textContent = `${data.location.localtime}`;

            const sunRiseAPI = `http://api.weatherapi.com/v1/astronomy.json?key=${apiKey}&q=${location}&days=3`;
            return fetch(sunRiseAPI);
        })
        .then(res => res.json())
        .then(data => {
            sunRise.textContent = `${data.astronomy.astro.sunrise}`;


           
            const forecastAPI = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`;
            return fetch(forecastAPI);
        })
        .then(res => res.json())
        .then(data => {
            fTemp.textContent = `${data.forecast.forecastday[0].day.maxtemp_c}°C`;
            sTemp.textContent = `${data.forecast.forecastday[1].day.maxtemp_c}°C`;
            tTemp.textContent = `${data.forecast.forecastday[2].day.maxtemp_c}°C`;
            fDate.textContent = `${data.forecast.forecastday[0].date}`;
            sDate.textContent = `${data.forecast.forecastday[1].date}`;
            tDate.textContent = `${data.forecast.forecastday[2].date}`;
            fIcon.src = data.forecast.forecastday[0].day.condition.icon;
            sIcon.src = data.forecast.forecastday[1].day.condition.icon;
            tIcon.src = data.forecast.forecastday[2].day.condition.icon;
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function geolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const location = `${lat},${lon}`;
                getWeather(location);
            },
            error => {
                console.error("Error getting geolocation:", error);
                alert("Unable to retrieve your location.");
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

document.getElementById("search-button").addEventListener("click", () => {
    const city = input.value.trim();
    if (city) {
        getWeather(city);
    } else {
        geolocation();
    }
});
