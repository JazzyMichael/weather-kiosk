import CitiesSection from "./components/CitiesSection";
import DaySection from "./components/DaySection";
import Header from "./components/Header";
import RainSection from "./components/RainSection";
import WeekSection from "./components/WeekSection";

function App() {
  return (
    <div className="bg-background text-foreground p-5">
      <Header />

      <div className="flex">
        <div className="w-3/4">
          <WeekSection />
          <DaySection />
        </div>

        <div className="w-1/4">
          <RainSection />
          <CitiesSection />
        </div>
      </div>
    </div>
  );
}

export default App;
