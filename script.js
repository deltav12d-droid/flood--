// === CONFIGURATION ===
const API_KEY = 'ce70bf8bdb2bbf3ad192ee196735d6cf'; // Your API Key
const KERALA_COORDS = [10.8505, 76.2711]; // Center of Kerala
const WEATHER_REFRESH_INTERVAL = 10 * 60 * 1000; // 10 min in ms

// === INITIALIZE MAP ===
const map = L.map('map').setView(KERALA_COORDS, 7);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// === WEATHER INFO ===
async function fetchWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${KERALA_COORDS[0]}&lon=${KERALA_COORDS[1]}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    const description = data.weather[0].description;
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const rain = data.rain ? data.rain['1h'] || 0 : 0;

    document.getElementById('weather-info').innerHTML = `
        🌡️ Temperature: ${temp}°C | 💧 Humidity: ${humidity}% | 🌦️ Condition: ${description} | 🌧️ Rainfall (last hour): ${rain}mm
    `;

    updateFloodMarkers(rain);
}

function updateFloodMarkers(rainfall) {
    // Remove existing flood markers
    map.eachLayer(layer => {
        if (layer.options && layer.options.pane === "overlayPane") {
            map.removeLayer(layer);
        }
    });

    // Dummy locations for flood-prone areas
    if (rainfall >= 5) {
        const floodLocations = [
            { name: 'Kochi', coords: [9.9312, 76.2673] },
            { name: 'Trivandrum', coords: [8.5241, 76.9366] },
            { name: 'Kozhikode', coords: [11.2588, 75.7804] }
        ];

        floodLocations.forEach(loc => {
            L.marker(loc.coords)
             .addTo(map)
             .bindPopup(`⚠️ Heavy rain detected! Possible flooding in ${loc.name}.`)
             .openPopup();
        });
    }
}

// Initial load
fetchWeather();
// Refresh every 10 minutes
setInterval(fetchWeather, WEATHER_REFRESH_INTERVAL);
