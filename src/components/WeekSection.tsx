import { Switch } from "@headlessui/react";
import { useState } from "react";
import { useWeather } from "../weather-context";
import { motion } from "framer-motion";

const DayCard = ({
  day,
  icon,
  display,
  onClick,
  selected,
  time,
  weather,
}: {
  day: string;
  icon: string;
  display: string;
  onClick?: Function;
  selected: boolean;
  time: string;
  weather: any;
}) => {
  const properties = [
    { label: "Real Feel", value: `${weather?.realFeel}°` },
    { label: "Wind N-E.", value: `${weather?.windKM}km/h` },
    { label: "Pressure", value: `${weather?.pressureMB}MB` },
    { label: "Humidity", value: `${weather?.day.avghumidity}%` },
    { label: "Sunrise", value: weather?.astro.sunrise },
    { label: "Sunset", value: weather?.astro.sunset },
  ];

  return (
    <motion.div
      layout
      data-isOpen={selected}
      onClick={(e) => onClick && onClick(e)}
      whileHover={{ scale: 0.95 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
      className="weekday-card h-[226px] rounded-[30px] bg-card flex flex-col items-center justify-between"
    >
      {selected ? (
        <div className="bg-[#BBD7EC] rounded-[25px] h-full min-w-[256px]">
          {/* Header */}
          <div className="bg-[#AECADF] rounded-t-[25px] flex justify-between p-4 text-[#0F0F11] font-semibold">
            <span>{day}</span>
            <span>{time}</span>
          </div>

          {/* Content */}
          <div className="p-3">
            <div className="flex justify-between">
              <span className="text-[36px] text-[#0F0F11] font-semibold">
                {display}
              </span>

              <img src={icon} />
            </div>

            <div className="grid grid-cols-2 grid-rows-4 grid-flow-col gap-1">
              {properties.map(({ label, value }, i) => (
                <div
                  key={i}
                  className={i === 0 ? "col-span-2 text-xs" : "text-xs"}
                >
                  <span className="text-gray-500">{label} </span>
                  <span className="text-black font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="uppercase border-b border-[#39393A] font-semibold p-3 w-full text-center">
            {day.substring(0, 3)}
          </div>

          <img src={icon} className="size-[50px]" />

          <span className="text-[32px] font-semibold mb-5">{display}</span>
        </>
      )}
    </motion.div>
  );
};

const getDayNames = () => {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const currentDayIndex = new Date().getDay();

  return [...dayNames.splice(currentDayIndex), ...dayNames];
};

export default function WeekSection() {
  const [forecastToggle, setForecastToggle] = useState("forecast");

  const {
    weatherData,
    timestamp,
    realFeel,
    pressureMB,
    windKM,
    loading,
    requestLocationAccess,
    selectedIndex,
    setSelectedIndex,
  } = useWeather();

  if (loading) {
    return <div className="py-40 text-center">Loading...</div>;
  }
  if (!weatherData?.current) {
    return (
      <div className="py-40 text-center">
        Search for a city, choose one from the list, or{" "}
        <button onClick={requestLocationAccess}>
          Use Your Current Location
        </button>
      </div>
    );
  }

  return (
    <div className="flex-grow">
      {/* header */}
      <div className="flex justify-between py-8">
        <div className="text-xl text-[#818085] flex gap-4">
          <span className="hidden sm:block">Today</span>
          <span className="hidden sm:block">Tomorrow</span>
          <span className="text-foreground font-medium">Next 7 Days</span>
        </div>

        <Switch
          checked={forecastToggle !== "forecast"}
          onChange={(checked: boolean) =>
            setForecastToggle(checked ? "air-quality" : "forecast")
          }
          className="group inline-flex relative h-[30px] w-[163px] items-center rounded-full bg-forecast-toggle transition"
        >
          <span className="w-2/4 h-full translate-x-0 rounded-full bg-[#bbd7ec] transition duration-300 group-data-[checked]:translate-x-20" />

          <span className="text-[11px] font-bold text-[#1E1E1E] group-data-[checked]:text-[#818085] transition absolute left-3">
            Forecast
          </span>

          <span className="text-[11px] font-bold text-[#818085] group-data-[checked]:text-[#1E1E1E] transition absolute right-3">
            Air Quality
          </span>
        </Switch>
      </div>

      {/* content */}
      <div className="w-full h-auto flex gap-2 justify-between overflow-x-auto md:overflow-x-hidden overflow-y-hidden">
        {weatherData?.forecast &&
          getDayNames().map(
            (day, i) => (
              <DayCard
                onClick={() => setSelectedIndex(i)}
                selected={i === selectedIndex}
                key={i}
                day={day}
                time={timestamp}
                icon={weatherData.forecast.forecastday[i].day.condition.icon}
                display={
                  forecastToggle === "forecast"
                    ? Math.round(
                        weatherData.forecast.forecastday[i]?.day?.avgtemp_f
                      ) + "°"
                    : weatherData.forecast.forecastday[i]?.day?.avghumidity +
                      "%"
                }
                weather={{
                  ...weatherData.forecast.forecastday[i],
                  realFeel,
                  pressureMB,
                  windKM,
                }}
              />
            )
            // i === selectedIndex ? (
            //   <DetailedCard
            //     key={i}
            //     day={day}
            //     time={timestamp}
            //     weather={{
            //       ...weatherData.forecast.forecastday[i],
            //       realFeel,
            //       pressureMB,
            //       windKM,
            //     }}
            //   />
            // ) : (
            //   <SimpleCard
            //     key={i}
            //     day={day}
            //     icon={weatherData.forecast.forecastday[i].day.condition.icon}
            //     weather={
            //       forecastToggle === "forecast"
            //         ? Math.round(
            //             weatherData.forecast.forecastday[i]?.day?.avgtemp_f
            //           ) + "°"
            //         : weatherData.forecast.forecastday[i]?.day?.avghumidity +
            //           "%"
            //     }
            //     onClick={() => setSelectedIndex(i)}
            //   />
            // )
          )}
      </div>
    </div>
  );
}
