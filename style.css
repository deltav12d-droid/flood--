const API_KEY = 'ce70bf8bdb2bbf3ad192ee196735d6cf';
const KERALA_CENTER = [10.8505, 76.2711];
const UPDATE_INTERVAL = 60 * 1000; // 1 min

const map = L.map('map').setView(KERALA_CENTER, 8);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Real Ernakulam locations
const floodLocations = [
    { name: 'MG Road', coords: [9.9816, 76.2858] },
    { name: 'Kaloor', coords: [9.9987, 76.2997] },
    { name: 'Edappally', coords: [10.0272, 76.3089] },
    { name: 'Vyttila', coords: [9.9676, 76.3182] },
    { name: 'Fort Kochi', coords: [9.9667, 76.2425] }
];

let activeMarkers = [];

async function fetchWeatherAndUpdate() {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=9.9816&lon=76.2858&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        const description = data.weather[0].description;
        const temp = data.main.temp;
        const humidity = data.main.humidity;
        const rainfall = data.rain && data.rain['1h'] ? data.rain['1h'] : 0;

        document.getElementById('weather-info').innerHTML =
            `🌡️ Temp: ${temp}°C | 💧 Humidity: ${humidity}% | 🌦️ ${description} | 🌧️ Rainfall: ${rainfall} mm`;

        updateFloodAlerts(rainfall);
    } catch (error) {
        console.error("Weather fetch failed:", error);
        document.getElementById('weather-info').innerHTML = "⚠️ Failed to load weather data";
    }
}

function updateFloodAlerts(rainfall) {
    // Clear previous markers
    activeMarkers.forEach(m => map.removeLayer(m));
    activeMarkers = [];

    if (rainfall >= 5) {
        document.getElementById('alert-info').innerHTML = "⚠️ High rainfall detected! Possible urban flooding in marked areas.";

        floodLocations.forEach(loc => {
            const marker = L.circleMarker(loc.coords, {
                radius: 8,
                fillColor: 'red',
                color: '#000',
                weight: 1,
                fillOpacity: 0.8
            }).addTo(map).bindPopup(`⚠️ Flood Alert: ${loc.name}`);
            activeMarkers.push(marker);
        });
    } else {
        document.getElementById('alert-info').innerHTML = "✅ No flood risk currently detected.";
    }
}

// Load on start
fetchWeatherAndUpdate();
// Refresh every minute
setInterval(fetchWeatherAndUpdate, UPDATE_INTERVAL);
