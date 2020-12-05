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
  },
  reducers: {},
  extraReducers: {
    [fetchCurrentWeather.pending]: (state, { payload, meta }) => {
      state.error = null;
      state.loading = true;
    },
    [fetchCurrentWeather.fulfilled]: (state, { payload, meta }) => {
      state.currentWeatherLoading = false;
      state.currentWeatherData = payload.data;
    },
    [fetchCurrentWeather.rejected]: (state, { error, meta }) => {
      state.error = error;
      state.currentWeatherData = null;
      state.loading = false;
    },
    [fetchWeatherForecast.fulfilled]: (state, { payload, meta }) => {
      state.weatherForecastData = payload.data;
      state.loading = false;
    },
    [fetchWeatherForecast.rejected]: (state, { error, meta }) => {
      state.weatherForecast = null;
      state.loading = false;
    },
  },
});

export default weatherSlice.reducer;
