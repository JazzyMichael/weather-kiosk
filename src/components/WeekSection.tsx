import { Switch } from "@headlessui/react";
import { useState } from "react";
import { useWeather } from "../weather-context";

const SimpleCard = ({
  day,
  icon,
  weather,
  onClick,
}: {
  day: string;
  icon: string;
  weather: any;
  onClick?: Function;
}) => (
  <div
    onClick={(e) => onClick && onClick(e)}
    className="h-[226px] rounded-[30px] bg-[#1B1B1D] min-w-[96px] flex flex-col items-center justify-between pb-5"
  >
    <div className="uppercase border-b border-[#39393A] font-bold p-3 w-full text-center">
      {day.substring(0, 3)}
    </div>

    <img src={icon} className="size-[50px]" />

    <span className="text-[32px] font-bold">{weather}</span>
  </div>
);

const DetailedCard = ({
  day,
  time,
  weather,
}: {
  day: string;
  time: string;
  weather: any;
}) => {
  const properties = [
    { label: "Real Feel", value: "18" },
    { label: "Wind N-E", value: "7km/h" },
    { label: "Pressure", value: "100MB" },
    { label: "Humidity", value: "51%" },
    { label: "Sunrise", value: "5:30AM" },
    { label: "Sunset", value: "6:45PM" },
  ];

  return (
    <div className="bg-[#BBD7EC] rounded-[25px] h-[226px] flex-grow max-w-64">
      {/* Header */}
      <div className="bg-[#AECADF] rounded-t-[25px] flex justify-between p-4 text-[#0F0F11] font-semibold">
        <span>{day}</span>
        <span>{time}</span>
      </div>

      {/* Content */}
      <div className="p-3">
        <div className="flex justify-between">
          <span className="text-[36px] text-[#0F0F11] font-semibold">
            16&deg;
          </span>

          <img src={weather.day.condition.icon} />
        </div>

        <div className="grid grid-cols-2 grid-rows-4 grid-flow-col gap-1">
          {properties.map(({ label, value }, i) => (
            <div key={i} className={i === 0 ? "col-span-2 text-xs" : "text-xs"}>
              <span className="text-gray-500">{label} </span>
              <span className="text-black font-bold">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function WeekSection() {
  const [forecastToggle, setForecastToggle] = useState("forecast");
  const [selected, setSelected] = useState(0);

  const { weatherData, timestamp } = useWeather();

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dayIndex = new Date().getDay();

  const weekData = [...dayNames.splice(dayIndex), ...dayNames];

  if (!weatherData?.current) {
    return (
      <div className="py-40 text-center">
        Search for a city or choose one from the list!
      </div>
    );
  }

  return (
    <div className="flex-grow">
      {/* header */}
      <div className="flex justify-between py-8">
        <div className="text-xl text-[#818085] flex gap-4">
          <span>Today</span>
          <span>Tomorrow</span>
          <span className="text-foreground font-medium">Next 7 Days</span>
        </div>

        <Switch
          checked={forecastToggle !== "forecast"}
          onChange={(checked: boolean) =>
            setForecastToggle(checked ? "air-quality" : "forecast")
          }
          className="group inline-flex relative h-[30px] w-[163px] items-center rounded-full bg-[#1E1E1E] transition"
        >
          <span className="w-2/4 h-full translate-x-0 rounded-full bg-[#BBD7EC] transition duration-300 group-data-[checked]:translate-x-20" />

          <span className="text-[11px] font-bold text-[#1E1E1E] group-data-[checked]:text-[#818085] transition absolute left-3">
            Forecast
          </span>

          <span className="text-[11px] font-bold text-[#818085] group-data-[checked]:text-[#1E1E1E] transition absolute right-3">
            Air Quality
          </span>
        </Switch>
      </div>

      {/* content */}
      <div className="w-full flex justify-between">
        {weatherData?.forecast &&
          weekData.map((day, i) =>
            i === selected ? (
              <DetailedCard
                key={i}
                day={day}
                time={timestamp}
                weather={weatherData.forecast.forecastday[i]}
              />
            ) : (
              <SimpleCard
                key={i}
                day={day}
                icon={weatherData.forecast.forecastday[i].day.condition.icon}
                weather={
                  forecastToggle === "forecast"
                    ? Math.round(
                        weatherData.forecast.forecastday[i]?.day?.avgtemp_f
                      ) + "°"
                    : weatherData.forecast.forecastday[i]?.day?.avghumidity +
                      "%"
                }
                onClick={() => setSelected(i)}
              />
            )
          )}
      </div>
    </div>
  );
}
