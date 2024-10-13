import { createContext, useContext, useState } from "react";

const apiURL =
  "http://api.weatherapi.com/v1/forecast.json?key=c6b3f1a152e044199de140419241210&days=7&q=";

const initialData: any = {
  weatherData: {},
  loadWeatherData: async (term: string) => {},
};

const WeatherContext = createContext(initialData);

export const WeatherProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [weatherData, setWeatherData] = useState({});

  const loadWeatherData = async (term: string) => {
    const data = await fetch(apiURL + term).then((res) => res.json());
    setWeatherData(data);
  };

  const value = { weatherData, loadWeatherData };

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};

export const useWeather = () => {
  return useContext(WeatherContext);
};
