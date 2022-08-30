// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import axios from "axios";

const URL = "https://api.openweathermap.org/data/2.5/weather"; //main
const URL2 = "https://api.openweathermap.org/data/2.5/onecall"; //for city to coordinate
const URL3 = "https://api.openweathermap.org/data/2.5/forecast"; //for coordinate to city
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const getCityCoords = async (cityName) => {
  let cityCoords = await axios.get(URL, {
    params: {
      q: cityName,
      units: "metric",
      APPID: API_KEY,
    },
  });
  return cityCoords.data.coord;
};

const getCityName = async ({ lon, lat }) => {
  const { data } = await axios.get(URL3, {
    params: {
      lat: lat,
      lon: lon,
      APPID: API_KEY,
    },
  });
  return data.city.name;
};

const getIconUrl = (icon) => {
  return `http://openweathermap.org/img/wn/${icon}.png`;
};

export const fetchWeather = async (coordinates) => {
  let city = "Kathmandu";
  let coords = { lon: coordinates.lon, lat: coordinates.lat };
  if (typeof coordinates === "string") {
    city = coordinates;
    coords = await getCityCoords(coordinates);
  }

  if (typeof coordinates === "object") {
    city = await getCityName(coordinates);
  }

  const { data } = await axios.get(URL2, {
    params: {
      lat: coords.lat,
      lon: coords.lon,
      exclude: "minutely",
      units: "metric",
      APPID: API_KEY,
    },
  });

  const currentWeatherData = {
    temp: data.current.temp,
    city: city,
    humidity: data.current.humidity,
    windspeed: data.current.wind_speed,
    visibility: data.current.visibility,
    description: data.current.weather[0].main,
    icon: getIconUrl(data.current.weather[0].icon),
  };

  const hourlyWeatherData = await data.hourly
    .map((i) => {
      return {
        // prettier-ignore
        time: new Date(i.dt * 1000).getHours(),
        temp: Math.round(i.temp),
        icon: getIconUrl(i.weather[0].icon),
      };
    })
    .slice(0, 24);

  const dailyWeatherData = data.daily.map((i) => {
    return {
      // prettier-ignore
      day: new Date(i.dt * 1000).toString().split(' ')[0],
      temp: Math.round(i.temp.day),
      icon: getIconUrl(i.weather[0].icon),
    };
  });

  return { currentWeatherData, hourlyWeatherData, dailyWeatherData };
};
