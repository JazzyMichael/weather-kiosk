export default function CitiesSection() {
  const data = [
    { city: "Beijing", country: "China", weather: "Cloudy" },
    { city: "California", country: "US", weather: "Windy" },
    { city: "Dubai", country: "Arab Emirates", weather: "Mostly Sunny" },
    { city: "Charlottetown", country: "Canada", weather: "Light Snow Shower" },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between py-5">
        <h4 className="font-medium">Other Cities</h4>
        <h6 className="text-sm">See All</h6>
      </div>

      <div className="flex flex-col gap-5">
        {data.map((x) => (
          <div
            key={x.city}
            className="flex justify-between items-center h-[110px] rounded-[15px] p-4 min-w-72 bg-[#1B1B1D]"
          >
            <div className="flex flex-col justify-between h-full">
              <div className="text-[14px] text-[#777777]">{x.country}</div>
              <div className="text-[20px]">{x.city}</div>
              <div className="text-[14px] text-[#EFEFEF]">{x.weather}</div>
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
