import axios from "axios";

export default {
  fetchCurrentWeather: ({ query }) =>
    axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    ),
  fetchWeatherForecast: ({ lat, lon }) =>
    axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,current,minutely,alerts&appid=${process.env.REACT_APP_API_KEY}`
    ),
};
