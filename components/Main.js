import dynamic from "next/dynamic";

const Main = ({ data }) => {
  // run component only on client side
  const ComponentWithNoSSR = dynamic(
    () => import("../components/DateTimeWidget"),
    { ssr: false }
  );
  return (
    <>
      {/* main */}
      <main>
        <div className=" flex flex-col items-center  justify-center  p-3 md:h-[70vh] ">
          <div className="text-center">
            <h1 className=" mt-5 text-3xl font-bold">{data?.city}</h1>
            <ComponentWithNoSSR />
          </div>
          <img className="h-52 sm:hidden" src={data?.icon} alt="" />
          <div className="mt-3 p-5 text-8xl">
            {Math.round(data?.temp)} <sup>0</sup>C
          </div>
          <div className="font-bold">Mostly {data?.description}</div>
        </div>
      </main>
    </>
  );
};

export default Main;
