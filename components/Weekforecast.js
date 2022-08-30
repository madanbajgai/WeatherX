const Weekforecast = ({ weekday, icon, temp, darkmode }) => {
  return (
    <div>
      <div
        className=" mx-2 flex h-24 w-24 flex-col items-center rounded-md py-2"
        style={
          darkmode ? { backgroundColor: "black" } : { backgroundColor: "white" }
        }
      >
        <p>{weekday}</p>
        <img className="h-16" src={icon} alt="" />
        <p>
          {temp} <sup>0</sup> C
        </p>
      </div>
    </div>
  );
};

export default Weekforecast;
