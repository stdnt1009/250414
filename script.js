
const apiKey = "17de9978039a45d48fe83606251404";

function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) {
    alert("도시명을 입력해주세요.");
    return;
  }
  fetchWeather(city, "weatherResult");
}

function fetchWeather(city, elementId) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("도시 정보를 찾을 수 없습니다.");
      }
      return response.json();
    })
    .then(data => {
      const weatherElement = document.getElementById(elementId);
      weatherElement.innerHTML = `
        <h2>${data.location.name}</h2>
        <p>온도: ${data.current.temp_c}°C</p>
        <p>날씨: ${data.current.condition.text}</p>
        <p>습도: ${data.current.humidity}%</p>
        <p>풍속: ${data.current.wind_kph} km/h</p>
      `;
    })
    .catch(error => {
      document.getElementById(elementId).innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
}

// 페이지 로드시 고정 도시들의 날씨 정보 가져오기
window.onload = function() {
  fetchWeather("Moscow", "moscowWeather");
  fetchWeather("Mexico City", "mexicoWeather");
  fetchWeather("Sao Paulo", "brazilWeather");
};
