import { useWeather } from "../weather-context";
import { Bar } from "react-chartjs-2";

type ChartData = {
  date: number;
  temp: number;
  chance: number;
};

export default function RainSection() {
  const { rain = [] } = useWeather();

  const weatherData: ChartData[] = (rain as any[])
    .map((hour: any) => {
      const { chance_of_rain, chance_of_snow, temp_f, time } = hour;

      const chance = Math.max(chance_of_rain, chance_of_snow);

      let date = new Date(time).getHours() + 1;

      if (date > 12) date = date - 12;

      return { temp: Math.round(temp_f), chance, date };
    })
    .slice(10, 15);

  const data = {
    labels: weatherData.map((x) => x.date),
    datasets: [
      {
        data: weatherData.map((x) => x.temp),
        backgroundColor: ["#bbd7ec"],
        maxBarThickness: 4,
      },
    ],
  };

  if (!rain?.length) {
    return <div></div>;
  }

  return (
    <div className="p-4">
      <h2 className="mb-5 pt-4 text-xl font-medium">Chance of Rain</h2>
      {/* <p className="text-sm">
        (Showing temperature because there is no chance of rain today)
      </p> */}
      <div className="h-[226px] flex items-center relative">
        <Bar
          data={data}
          options={{
            plugins: {
              legend: { display: false },
              tooltip: { enabled: false },
            },
          }}
        />
      </div>
    </div>
  );
}
