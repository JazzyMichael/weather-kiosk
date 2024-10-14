import { createContext, useContext, useState } from "react";

const apiURL =
  "http://api.weatherapi.com/v1/forecast.json?key=c6b3f1a152e044199de140419241210&days=7&q=";

const initialData: any = {
  weatherData: {},
  loadWeatherData: async (term: string) => {},
};

const WeatherContext = createContext(initialData);

const getTime = () => {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Pad minutes with a leading zero if needed
  const minutesStr = minutes < 10 ? "0" + minutes : minutes;

  return `${hours}:${minutesStr} ${ampm}`;
};

export const WeatherProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [weatherData, setWeatherData] = useState<any>({});

  const loadWeatherData = async (term: string) => {
    const data = await fetch(apiURL + term).then((res) => res.json());

    setWeatherData(data);
  };

  const windStatus = weatherData?.current?.wind_kph;
  const humidity = weatherData?.current?.humidity;
  const dewpoint = weatherData?.current?.dewpoint_f;
  const visibility = weatherData?.current?.vis_km;
  const UVindex = weatherData?.forecast?.forecastday[0].day.uv;
  const conditionText = weatherData?.current?.condition?.text;
  const rain = weatherData?.forecast?.forecastday[0].hour;

  const value = {
    timestamp: getTime(),
    weatherData,
    loadWeatherData,
    windStatus,
    humidity,
    dewpoint,
    visibility,
    UVindex,
    conditionText,
    condition: weatherData?.current?.condition,
    rain,
  };

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};

export const useWeather = () => {
  return useContext(WeatherContext);
};
