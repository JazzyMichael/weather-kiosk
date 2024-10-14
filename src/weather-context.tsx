import { createContext, useContext, useState } from "react";

const apiURL =
  "https://api.weatherapi.com/v1/forecast.json?key=c6b3f1a152e044199de140419241210&days=7&q=";

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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadWeatherData = async (searchTerm: string) => {
    console.log("Loading weather", searchTerm);

    try {
      const data = await fetch(apiURL + searchTerm).then((res) => res.json());
      setWeatherData({ ...data, searchTerm });
      setLoading(false);
    } catch (e) {
      console.log("Could not load weather data", e);
      setLoading(false);
    }
  };

  const requestLocationAccess = () => {
    console.log("Loading location");
    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        loadWeatherData(`${latitude},${longitude}`);
      },
      (error) => {
        console.log("permission denied", error);
        alert("Must allow location sharing to use current location.");
      }
    );
  };

  const temp = weatherData?.current?.temp_f;
  const windStatus = weatherData?.current?.wind_kph;
  const humidity = weatherData?.current?.humidity;
  const dewpoint = weatherData?.current?.dewpoint_f;
  const visibility = weatherData?.current?.vis_km;
  const UVindex = weatherData?.forecast?.forecastday[0].day.uv;
  const conditionText = weatherData?.current?.condition?.text;
  const rain = weatherData?.forecast?.forecastday[selectedIndex].hour;
  const condition = weatherData?.current?.condition;
  const realFeel = weatherData?.current?.feelslike_f;
  const pressureMB = weatherData?.current?.pressure_mb;
  const windKM = Math.round(weatherData?.current?.wind_kph ?? 0);
  const sunrise =
    weatherData?.forecast?.forecastday[selectedIndex].astro.sunrise;
  const sunset = weatherData?.forecast?.forecastday[selectedIndex].astro.sunset;

  const value = {
    timestamp: getTime(),
    weatherData,
    loadWeatherData,
    requestLocationAccess,
    setSelectedIndex,
    selectedIndex,
    loading,
    temp,
    windStatus,
    humidity,
    dewpoint,
    visibility,
    UVindex,
    conditionText,
    condition,
    rain,
    realFeel,
    pressureMB,
    windKM,
    sunrise,
    sunset,
  };

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};

export const useWeather = () => {
  return useContext(WeatherContext);
};
