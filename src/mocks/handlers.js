import { rest } from "msw";
import { currentWeather, weatherForecast } from "./fixtures";

export const handlers = [
  rest.get(
    "https://api.openweathermap.org/data/2.5/weather",
    (req, res, ctx) => {
      const params = req.url.searchParams;
      const q = params.get("q");

      if (!q) {
        return res(
          ctx.status(400),
          ctx.json({
            cod: "400",
            message: "Nothing to geocode",
          })
        );
      }

      if (q.toLowerCase() === "hanoi") {
        return res(ctx.status(200), ctx.json(currentWeather.hanoi));
      }

      return res(ctx.status(200), ctx.json(currentWeather.singapore));
    }
  ),
  rest.get(
    "https://api.openweathermap.org/data/2.5/onecall",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(weatherForecast.singapore));
    }
  ),
];
