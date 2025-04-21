const apiKey = "1e3e8f230b6064d27976e41163a82b77"; 

    async function getWeather() {
      const city = document.getElementById("city").value;
      if (!city) return;

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      const res = await fetch(url);
      const data = await res.json();
      displayWeather(data);
    }

    async function getWeatherByLocation() {
      if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
      }

      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
        const res = await fetch(url);
        const data = await res.json();
        displayWeather(data);
      }, (error) => {
        alert("Unable to retrieve your location.");
        console.error(error);
      });
    }

    function displayWeather(data) {
      const weatherDiv = document.getElementById("weather");

      if (data.cod === 200) {
        weatherDiv.innerHTML = `
          <h2>${data.name}, ${data.sys.country}</h2>
          <p><strong>${data.weather[0].description}</strong></p>
          <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
          <p>🌡️ ${data.main.temp}°C</p>
          <p>💧 Humidity: ${data.main.humidity}%</p>
        `;
      } else {
        weatherDiv.innerHTML = `<p style="color:red;">${data.message}</p>`;
      }
    }