import { useState } from "react";
import { Switch } from "@headlessui/react";
import { Sun, Moon } from "../icons";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    document.body.classList.contains("light") ? "light" : "dark"
  );

  const toggleTheme = (checked: boolean) => {
    const newTheme = checked ? "dark" : "light";

    document.body.classList.remove(newTheme === "dark" ? "light" : "dark");
    document.body.classList.add(newTheme);

    setTheme(newTheme);

    localStorage.setItem("theme", newTheme);
  };

  return (
    <Switch
      checked={theme === "dark"}
      onChange={toggleTheme}
      className="group relative h-[46px] w-[115px] cursor-pointer rounded-[20px] border border-[#626161] bg-background transition-colors duration-300 ease-in-out focus:outline-none"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none inline-flex items-center justify-center size-10 -translate-x-9 rounded-full bg-foreground group-data-[checked]:bg-[#D8E9F9] group-data-[checked]:translate-x-9 ring-0 transition duration-200 ease-in-out"
      >
        {theme === "dark" ? <Moon /> : <Sun />}
      </span>
    </Switch>
  );
}
