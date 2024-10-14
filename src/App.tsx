import CitiesSection from "./components/CitiesSection";
import DaySection from "./components/DaySection";
import Header from "./components/Header";
import RainSection from "./components/RainSection";
import WeekSection from "./components/WeekSection";
import { WeatherProvider } from "./weather-context";

function App() {
  return (
    <WeatherProvider>
      <div className="bg-background text-foreground p-5 pb-2 min-h-screen">
        <Header />

        <div className="flex flex-col xl:flex-row max-w-[1600px] m-auto">
          <div className="w-full xl:w-3/4">
            <WeekSection />
            <DaySection />
          </div>

          <div className="w-full xl:w-1/4 flex flex-col justify-between">
            <RainSection />
            <CitiesSection />
          </div>
        </div>
      </div>
    </WeatherProvider>
  );
}

export default App;
