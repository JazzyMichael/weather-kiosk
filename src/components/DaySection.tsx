import { useWeather } from "../weather-context";

const bgURL =
  "https://s3-alpha-sig.figma.com/img/2468/6455/f33933b63012c284ff4e8adc22f40ae8?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BkEV-bJrbC~Ayco50J9ktpoTX4bopy8Cq3asqJ1q4mMQC9~Hey1Qlvm-PX1WnQ1dNEymVjYDw~MRndY-ItAzUdqa-qn~GEN0OwjSxnM6ThaLFM0SqM-qLiVtV-TC9c46kN2aA56rQIk6-L8WzTW951q5TkaDNrm7Gk5c877FKeINHHkDjyl1oPb2euDxbTJdYZrYgwFpZM4oz-gs8iaYU~ZVGQc2p7nMBD3udr8GcBH2m4QWxOyrkzPz2oQSZYhNFE1xll1U0zTTdmRzbuSABtKa29wPO1SmYguIfl-sUDK7hf~KF9GXGCnDRUxtcDkkY0j3XpYDTZulnZsM9WtKfQ__";

export default function DaySection() {
  const {
    windStatus,
    UVindex,
    humidity,
    visibility,
    dewpoint,
    condition,
    timestamp,
  } = useWeather();

  return (
    <div className="flex-grow">
      <h4 className="py-8">Today's Overview</h4>

      <div className="grid grid-rows-2 grid-flow-col gap-5">
        {/* Grid Cards */}
        <div className="bg-card h-[245px] rounded-[15px] py-6 px-3 flex flex-col justify-between">
          <h2>Wind Status</h2>
          <div></div>
          <div className="flex justify-between gap-12">
            <p>
              {windStatus} <span>km/hr</span>
            </p>
            <p>{timestamp}</p>
          </div>
        </div>

        <div className="bg-card h-[245px] rounded-[15px] py-6 px-3 flex flex-col justify-between">
          <h2>Humidity</h2>
          <img
            src={condition?.icon}
            alt={condition?.text}
            width={128}
            className="m-auto"
          />
          <div className="flex justify-between gap-12">
            <span>{humidity}%</span>
            <p className="text-faded">
              The dew point is {dewpoint}&deg; right now
            </p>
          </div>
        </div>

        <div className="bg-card h-[245px] rounded-[15px] py-6 px-3 flex flex-col justify-between">
          <h2>UV Index</h2>
          <div></div>
          <p>
            {UVindex} <span>UV</span>
          </p>
        </div>

        <div className="bg-card h-[245px] rounded-[15px] py-6 px-3 flex flex-col justify-between">
          <h2>Visibility</h2>
          <img
            src={condition?.icon}
            alt={condition?.text}
            width={128}
            className="m-auto"
          />
          <div className="flex justify-between gap-12">
            <span>
              {visibility}
              <span>km</span>
            </span>
            <p className="text-faded">
              "{condition?.text}" is affecting visibility
            </p>
          </div>
        </div>

        {/* Grid CTA */}
        <div
          style={{ backgroundImage: "url(" + bgURL + ")" }}
          className="bg-auto bg-cover row-span-2 rounded-[15px] max-w-[408px] p-2 flex flex-col justify-around items-center"
        >
          <h5 className="text-[#060609] bg-[#D9D9D94D] p-3 font-bold text-2xl rounded-[15px] max-w-96 text-center">
            Explore global map of wind weather and ocean condition
          </h5>

          <button className="h-[80px] text-[#0F0F11] text-2xl font-bold rounded-[15px] bg-[#D9D9D9] uppercase px-12">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
