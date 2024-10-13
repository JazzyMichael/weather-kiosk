import ThemeToggle from "./components/ThemeToggle";

function App() {
  return (
    <div className="bg-background text-foreground">
      <header>
        <p className="text-xs">Lorem ipsum</p>
        <p className="text-xl">Lorem ipsum</p>
      </header>

      <ThemeToggle />
    </div>
  );
}

export default App;
