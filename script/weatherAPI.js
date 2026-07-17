const CITIES = {
  suncheon: { label: "대한민국 순천", latitude: 34.9507, longitude: 127.4872 },
  seoul: { label: "대한민국 서울", latitude: 37.5665, longitude: 126.9780 },
  tokyo: { label: "일본 도쿄", latitude: 35.6762, longitude: 139.6503 }
};

export async function fetchWeather(cityKey) {
  const city = CITIES[cityKey];
  if (!city) throw new Error("지원하지 않는 도시입니다.");

  const params = new URLSearchParams({
    latitude: city.latitude,
    longitude: city.longitude,
    current: "temperature_2m,relative_humidity_2m",
    timezone: "auto"
  });

  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
  if (!response.ok) throw new Error(`날씨 요청 실패: ${response.status}`);

  const data = await response.json();
  return {
    city: city.label,
    temperature: data.current.temperature_2m,
    humidity: data.current.relative_humidity_2m,
    temperatureUnit: data.current_units.temperature_2m,
    humidityUnit: data.current_units.relative_humidity_2m,
    updatedAt: data.current.time
  };
}
