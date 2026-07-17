import { fetchWeather } from "./weatherAPI.js";

const citySelect = document.querySelector("#city-select");
const statusElement = document.querySelector("#weather-status");
const panel = document.querySelector("#weather-panel");

async function updateWeather() {
  if (!citySelect) return;
  panel.hidden = true;
  citySelect.disabled = true;
  statusElement.textContent = "날씨 데이터를 불러오는 중입니다.";
  statusElement.style.color = "";

  try {
    const weather = await fetchWeather(citySelect.value);
    document.querySelector("#weather-location").textContent = weather.city;
    document.querySelector("#weather-temperature").textContent =
      `${weather.temperature}${weather.temperatureUnit}`;
    document.querySelector("#weather-humidity").textContent =
      `${weather.humidity}${weather.humidityUnit}`;
    document.querySelector("#weather-updated").textContent =
      `관측 시각: ${weather.updatedAt}`;
    panel.hidden = false;
    statusElement.textContent = "최신 날씨를 불러왔습니다.";
  } catch (error) {
    console.error(error);
    statusElement.textContent = "날씨를 불러오지 못했습니다. 네트워크 연결을 확인해주세요.";
    statusElement.style.color = "#ea002c";
  } finally {
    citySelect.disabled = false;
  }
}

if (citySelect) {
  citySelect.addEventListener("change", updateWeather);
  updateWeather();
}
