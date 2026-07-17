const CITIES = {
  gwangju: {
    label: "대한민국 광주",
    latitude: 35.15472,
    longitude: 126.91556
  },
  ulsan: {
    label: "대한민국 울산",
    latitude: 35.53722,
    longitude: 129.31667
  },
  pangyo: {
    label: "대한민국 판교",
    latitude: 37.3970,
    longitude: 127.1130
  }
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
