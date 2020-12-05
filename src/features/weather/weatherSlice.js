import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import weatherAPI from "../../api";

const sliceName = "weather";

export const fetchCurrentWeather = createAsyncThunk(
  `${sliceName}/fetchCurrentWeather`,
  ({ query }) => weatherAPI.fetchCurrentWeather({ query })
);

export const fetchWeatherForecast = createAsyncThunk(
  `${sliceName}/fetchWeatherForecast`,
  ({ lat, lon }) => weatherAPI.fetchWeatherForecast({ lat, lon })
);

export const weatherSlice = createSlice({
  name: sliceName,
  initialState: {
    currentWeatherData: null,
    weatherForecastData: null,
    error: null,
    loading: false,
    currentWeatherRequestId: undefined,
    weatherForecastRequestId: undefined,
  },
  reducers: {},
  extraReducers: {
    [fetchCurrentWeather.pending]: (state, { payload, meta }) => {
      state.error = null;
      state.loading = true;
      state.currentWeatherRequestId = meta.requestId;
    },
    [fetchCurrentWeather.fulfilled]: (state, { payload, meta }) => {
      if (meta.requestId === state.currentWeatherRequestId) {
        state.currentWeatherData = payload.data;
        state.currentWeatherRequestId = undefined;
      }
    },
    [fetchCurrentWeather.rejected]: (state, { error, meta }) => {
      if (meta.requestId === state.currentWeatherRequestId) {
        state.error = error;
        state.currentWeatherData = null;
        state.loading = false;
        state.currentWeatherRequestId = undefined;
      }
    },
    [fetchWeatherForecast.pending]: (state, { payload, meta }) => {
      state.weatherForecastRequestId = meta.requestId;
    },
    [fetchWeatherForecast.fulfilled]: (state, { payload, meta }) => {
      if (meta.requestId === state.weatherForecastRequestId) {
        state.weatherForecastData = payload.data;
        state.loading = false;
        state.weatherForecastRequestId = undefined;
      }
    },
    [fetchWeatherForecast.rejected]: (state, { error, meta }) => {
      if (meta.requestId === state.weatherForecastRequestId) {
        state.weatherForecast = null;
        state.loading = false;
        state.weatherForecastRequestId = undefined;
      }
    },
  },
});

export default weatherSlice.reducer;
