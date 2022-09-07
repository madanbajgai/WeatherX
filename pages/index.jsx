import { useEffect, useState } from "react";
import { fetchWeather } from "./api/fetchweather";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";

const Home = () => {
  const [darkmode, setdarkMode] = useState(false);
  const [lat, setLat] = useState(27.700769);
  const [lon, setLon] = useState(85.30014);
  const [weatherData, setweatherData] = useState({});
  const { currentWeatherData, dailyWeatherData, hourlyWeatherData } =
    weatherData;

  const getWeatherData = async () => {
    setweatherData(await fetchWeather({ lat, lon }));
  };

  // check system darkmode
  const isDarkTheme = () => {
    const theme = window.matchMedia
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? true
        : false
      : "unsupported";

    return theme;
  };

  //get current coordinates
  const getCoordinates = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    });
  };

  useEffect(() => {
    isDarkTheme();
    setdarkMode(isDarkTheme());
    getCoordinates();
    getWeatherData();
  }, []);

  return (
    <div
      className=" p-4 font-nothing md:px-10"
      style={
        darkmode
          ? { color: "white", backgroundColor: "black" }
          : { color: "black", backgroundColor: "white" }
      }
    >
      <Header
        darkmode={darkmode}
        setdarkMode={setdarkMode}
        setweatherData={setweatherData}
      />

      {Object.keys(weatherData).length === 0 ? (
        <div className="grid h-screen place-items-center text-6xl font-semibold">
          Loading ...
        </div>
      ) : (
        <>
          {" "}
          <Main data={currentWeatherData} />
          <Footer
            darkmode={darkmode}
            data={currentWeatherData}
            daily={dailyWeatherData}
            hourly={hourlyWeatherData}
          />
        </>
      )}
      <p>
        {" "}
        &copy; Designed & Developed by{" "}
        <a href="https://madanbajgai.com.np">MadanBazgai</a>{" "}
      </p>
    </div>
  );
};

export default Home;
