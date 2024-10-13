const bgURL =
  "https://s3-alpha-sig.figma.com/img/2468/6455/f33933b63012c284ff4e8adc22f40ae8?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BkEV-bJrbC~Ayco50J9ktpoTX4bopy8Cq3asqJ1q4mMQC9~Hey1Qlvm-PX1WnQ1dNEymVjYDw~MRndY-ItAzUdqa-qn~GEN0OwjSxnM6ThaLFM0SqM-qLiVtV-TC9c46kN2aA56rQIk6-L8WzTW951q5TkaDNrm7Gk5c877FKeINHHkDjyl1oPb2euDxbTJdYZrYgwFpZM4oz-gs8iaYU~ZVGQc2p7nMBD3udr8GcBH2m4QWxOyrkzPz2oQSZYhNFE1xll1U0zTTdmRzbuSABtKa29wPO1SmYguIfl-sUDK7hf~KF9GXGCnDRUxtcDkkY0j3XpYDTZulnZsM9WtKfQ__";

export default function DaySection() {
  return (
    <div className="flex-grow">
      <h4 className="py-8">Today's Overview</h4>

      <div className="grid grid-rows-2 grid-flow-col gap-5">
        {/* Grid Cards */}
        <div className="bg-[#1B1B1D] h-[245px] rounded-[15px] py-5 px-3">
          Wind Status
        </div>
        <div className="bg-[#1B1B1D] h-[245px] rounded-[15px] py-5 px-3">
          UV Index
        </div>
        <div className="bg-[#1B1B1D] h-[245px] rounded-[15px] py-5 px-3">
          Humidity
        </div>
        <div className="bg-[#1B1B1D] h-[245px] rounded-[15px] py-5 px-3">
          Visibility
        </div>

        {/* Grid CTA */}
        <div
          style={{ backgroundImage: "url(" + bgURL + ")" }}
          className="bg-auto bg-contain row-span-2 rounded-[15px] w-[408px] p-2 flex flex-col justify-around items-center"
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
