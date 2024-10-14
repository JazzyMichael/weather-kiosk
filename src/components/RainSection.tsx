import { useWeather } from "../weather-context";

export default function RainSection() {
  const { rain } = useWeather();

  if (!rain) {
    return <div></div>;
  }

  return (
    <div className="p-5 w-72">
      <h2 className="mb-5 pt-4 text-xl font-bold">Chance of Rain</h2>
      <div className="h-56 border"></div>
    </div>
  );
}
