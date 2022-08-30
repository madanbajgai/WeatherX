import Dayforecast from "./Dayforecast";
import Weatherdata from "./Weatherdata";
import Weekforecast from "./Weekforecast";

const Footer = ({ darkmode, daily, hourly, data }) => {
  return (
    <>
      {/* footer */}
      <footer>
        <div
          className=" flex justify-evenly rounded-md  text-sm  "
          style={
            darkmode
              ? { backgroundColor: "#171717" }
              : { backgroundColor: "lavender" }
          }
        >
          <Weatherdata
            darkmode={darkmode}
            icon="/windspeed.jpg"
            value={`${data?.windspeed} kmph`}
            type="Wind Speed"
          />
          <Weatherdata
            darkmode={darkmode}
            icon="/humidity.png"
            value={data?.humidity}
            type="Humidity"
          />
          <Weatherdata
            darkmode={darkmode}
            icon="/visibility.png"
            value={data?.visibility}
            type="Visibility"
          />
        </div>
        <div className="mt-3">
          <p className="text-sm font-bold">Todays Weather</p>
          <div
            className=" no-scrollbar flex overflow-x-scroll rounded-md py-2 text-sm "
            style={
              darkmode
                ? { backgroundColor: "#171717" }
                : { backgroundColor: "lavender" }
            }
          >
            {hourly &&
              hourly.map((item, i) => (
                <Dayforecast
                  key={i}
                  darkmode={darkmode}
                  temp={item.temp}
                  icon={item.icon}
                  time={item.time}
                />
              ))}
          </div>
        </div>
        <div className="mt-3">
          <p className="text-sm font-bold">This Week</p>
          <div
            className="no-scrollbar flex overflow-x-scroll rounded-md py-2 text-sm"
            style={
              darkmode
                ? { backgroundColor: "#171717" }
                : { backgroundColor: "lavender" }
            }
          >
            {daily &&
              daily.map((item, i) => (
                <Weekforecast
                  key={i}
                  darkmode={darkmode}
                  weekday={item?.day}
                  icon={item?.icon}
                  temp={item?.temp}
                />
              ))}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
