import axios from "axios";

const API_KEY = "";

export default {
    fetchCurrentWeather: ({ query }) =>
        axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}`
        ),
    fetchWeatherForecast: ({ lat, lon }) =>
        axios.get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,current&appid=${API_KEY}`
        ),
};
