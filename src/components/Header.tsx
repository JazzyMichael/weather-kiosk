import ThemeToggle from "./ThemeToggle";
import { BellIcon, GridIcon, MagnifyingGlassIcon, MapPinIcon } from "../icons";
import { useWeather } from "../weather-context";

const avatarURL =
  "https://s3-alpha-sig.figma.com/img/c84f/8c6d/32c74800fa7451cf47a74ee4b186b79c?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Dpx7yreuDBp-15bABW8s1X9i6x7JgiVdDFtHjtwaY5l4O6t95x9o~IYGjXEkjjkivU3XMeFbNpDOuDO9V6pkxUdxVYMvgS69nipl8WYJod85gJh1IDY0K1ibc9yrUrq8T7GPLtxa3YmP-2p4nOLwRG2BgMuRa45nQEbmTELlh~qsWOgNvJeYGSau~tzNuR5Si4v9~lusRXckpWEX5oY3-N9r39YeGf9ituZnjXPnVO1H5zNjRzB~8PFnKtOUsmpMohYAv2lMbzx3By6Tp6S0SQSYv1plNuvOqcIkfU9wDnJKsWnt6BlBldnKLr9Xgh99eshGGRmdw03DQXuWRBUrsw__";

export default function Header() {
  const { weatherData, loadWeatherData } = useWeather();

  const search = async (event: any) => {
    const term = event?.target?.value?.trim();

    if (term) {
      await loadWeatherData(term);
    } else {
      // clear input if it only contains spaces
      event.target.value = "";
    }
  };

  return (
    <header className="w-full">
      <div className="w-3/4 inline-flex justify-between">
        <div className="inline-flex items-center gap-3">
          <button className="bg-[#1E1E1E] text-white h-[50px] w-[50px] rounded-full flex items-center justify-center">
            <GridIcon />
          </button>

          <button className="bg-[#1E1E1E] text-white h-[50px] w-[50px] rounded-full flex items-center justify-center">
            <BellIcon />
          </button>

          {weatherData?.location && (
            <div className="flex items-center gap-2 text-foreground">
              <MapPinIcon />
              <span>
                {weatherData?.location?.name}, {weatherData?.location?.region}
              </span>
            </div>
          )}
        </div>

        <div className="relative flex-grow inline-flex items-stretch focus-within:z-10 text-white max-w-[492px]">
          <div className="pointer-events-none absolute inset-y-3 left-6">
            <MagnifyingGlassIcon />
          </div>
          <input
            id="search"
            name="search"
            autoComplete="off"
            placeholder="Search City"
            className="bg-[#1E1E1E] outline-none text-white text-sm block w-full h-[46px] rounded-lg py-1.5 pl-16 placeholder:text-white sm:text-sm sm:leading-6 focus:ring-2 focus:ring-foreground"
            onKeyDown={(event) => event.key === "Enter" && search(event)}
          />
        </div>
      </div>

      <div className="w-1/4 inline-flex justify-end gap-4">
        <ThemeToggle />

        <img
          src={avatarURL}
          alt="User Avatar"
          className="inline-block rounded-full size-10"
        />
      </div>
    </header>
  );
}
