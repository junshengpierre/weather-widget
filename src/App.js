import React, { useState, useEffect, useCallback } from "react";
import logo from "./logo.png";
import tw, { GlobalStyles as TailwindBaseStyles, styled } from "twin.macro";
import { keyframes, createGlobalStyle } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCurrentWeather,
  fetchWeatherForecast,
} from "./features/weather/weatherSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import moment from "moment";

function App() {
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");

  const {
    currentWeatherData,
    weatherForecastData,
    loading,
    error,
  } = useSelector((state) => state.weather);

  const fetchWeatherData = useCallback(
    ({ query }) => {
      dispatch(fetchCurrentWeather({ query }))
        .then(unwrapResult)
        .then((originalPromiseResult) => {
          const { lat, lon } = originalPromiseResult.data.coord;
          return dispatch(fetchWeatherForecast({ lat, lon }));
        })
        .catch((rejectedValueOrSerializedError) => {});
    },
    [dispatch]
  );

  useEffect(() => {
    fetchWeatherData({ query: "singapore" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData({ query });
  };

  return (
    <AppContainer>
      <TailwindBaseStyles />

      <GlobalStyle />

      <AppHeader>
        <AppLogo src={logo} alt="logo" />
      </AppHeader>

      <Form onSubmit={handleSubmit}>
        <TextInput
          data-testid="search-input"
          type="text"
          onChange={handleChange}
        />
        <SubmitButton type="submit" value="Search" />
      </Form>

      <Main>
        {error && <NotFound>City Not Found</NotFound>}

        {loading && !Boolean(currentWeatherData && weatherForecastData) && (
          <Loader />
        )}

        {Boolean(currentWeatherData && weatherForecastData) && (
          <WeatherContainer>
            <CityName>{currentWeatherData.name}</CityName>

            <CurrentWeatherSection>
              <WeatherDetailLeft>
                <Detail>
                  <img
                    src={`http://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@2x.png`}
                    alt={currentWeatherData.weather[0].description}
                  />
                  <Description>
                    {currentWeatherData.weather[0].description}
                  </Description>
                </Detail>

                <Temperature>{`${Math.round(
                  currentWeatherData.main.temp
                )}°C`}</Temperature>
              </WeatherDetailLeft>

              <WeatherDetailRight>
                <Meta>{`Wind: ${currentWeatherData.wind.speed} m/s`}</Meta>
                <Meta>{`Sunrise: ${moment
                  .unix(currentWeatherData.sys.sunrise)
                  .format("hh:mm A")}`}</Meta>
                <Meta>{`Sunset: ${moment
                  .unix(currentWeatherData.sys.sunset)
                  .format("hh:mm A")}`}</Meta>
              </WeatherDetailRight>
            </CurrentWeatherSection>

            <WeatherForecastSection>
              <DayList>
                {weatherForecastData.daily.slice(0, 5).map((day) => (
                  <DayItem key={day.dt.toString()}>
                    <DayName>{moment.unix(day.dt).format("ddd")}</DayName>
                    <DayImg
                      src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                      alt={day.weather[0].description}
                    />
                    <span>{`${Math.round(day.temp.day)}°C`}</span>
                  </DayItem>
                ))}
              </DayList>
            </WeatherForecastSection>
          </WeatherContainer>
        )}
      </Main>
    </AppContainer>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
  }

  ol,
  ul {
    list-style: none;
  }
`;

const AppContainer = styled.div`
  ${tw`px-8`}
`;

const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const AppLogo = styled.img`
  animation: ${float} infinite 3s ease-in-out;
  pointer-events: none;
`;

const AppHeader = styled.header`
  ${tw`flex justify-center pt-4 pb-12`}
`;

const Form = styled.form`
  ${tw`flex w-full mb-6`}
`;

const TextInput = styled.input`
  ${tw`border rounded border-gray-400 px-2.5 py-1 w-full`}
`;

const SubmitButton = styled.input`
  ${tw`border rounded border-gray-400 px-4 py-1 ml-4`}
`;

const Loader = styled.div`
  ${tw`rounded-full h-8 w-8 bg-gray-500 m-48`}
`;

const Main = styled.div`
  ${tw`border-4 rounded-lg border-gray-600 flex justify-center mb-8`}
`;

const WeatherContainer = styled.div`
  ${tw`flex flex-col p-4 w-full`}
`;

const CityName = styled.span`
  ${tw`font-bold self-center`}
`;

const CurrentWeatherSection = styled.div`
  ${tw`flex justify-between px-8 mb-6`}
`;

const WeatherForecastSection = styled.div``;

const DayList = styled.ul`
  ${tw`flex justify-between`}
`;

const DayItem = styled.li`
  ${tw`flex flex-col items-center`}
`;

const WeatherDetailLeft = styled.div`
  ${tw`flex items-center`}
`;

const Detail = styled.div`
  ${tw`flex flex-col items-center`}
`;

const WeatherDetailRight = styled.ul`
  ${tw`flex flex-col justify-center`}
`;

const Meta = styled.li`
  ${tw`mb-1`}
`;

const Temperature = styled.span`
  ${tw`text-3xl font-semibold ml-12`}
`;

const Description = styled.span`
  ${tw`capitalize font-semibold`}
`;

const DayName = styled.span`
  ${tw`uppercase`}
`;

const DayImg = styled.img`
  ${tw`w-16`}
`;

const NotFound = styled.span`
  ${tw`m-4`}
`;
