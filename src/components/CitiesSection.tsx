import { useWeather } from "../weather-context";

export default function CitiesSection() {
  const { loadWeatherData } = useWeather();

  const data = [
    { city: "Beijing", country: "China", weather: "Cloudy" },
    { city: "California", country: "US", weather: "Windy" },
    { city: "Dubai", country: "Arab Emirates", weather: "Mostly Sunny" },
    { city: "Charlottetown", country: "Canada", weather: "Light Snow Shower" },
  ];

  return (
    <div className="pl-4 h-full">
      <div className="flex justify-between pt-6 pb-10">
        <h4 className="font-medium">Other Cities</h4>
        <h6 className="text-sm">See All</h6>
      </div>

      <div className="flex flex-col gap-5">
        {data.map((x) => (
          <div
            onClick={() => loadWeatherData(x.city)}
            key={x.city}
            className="flex justify-between items-center h-[110px] rounded-[15px] p-4 min-w-72 bg-card"
          >
            <div className="flex flex-col justify-between h-full">
              <div className="text-[14px] text-[#777777]">{x.country}</div>
              <div className="text-[20px] text-foreground">{x.city}</div>
              <div className="text-[14px] text-faded">{x.weather}</div>
            </div>

            <img
              src="https://cdn.weatherapi.com/weather/64x64/day/113.png"
              className="size-[50px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
