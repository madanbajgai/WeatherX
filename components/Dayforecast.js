const Dayforecast = ({ temp, icon, time, darkmode }) => {
  let newtime;
  if (time > 12 && time < 24) {
    newtime = time % 12;
  } else if (time === 12 || time === 0) {
    newtime = 12;
  } else {
    newtime = time;
  }
  const ampm = time > 11 ? "PM" : "AM";

  return (
    <div>
      <div
        className=" mx-2 flex h-24 w-24 flex-col items-center rounded-md py-2"
        style={
          darkmode ? { backgroundColor: "black" } : { backgroundColor: "white" }
        }
      >
        <p>
          {temp} <sup>0</sup>C
        </p>
        <img className="h-16" src={icon} alt="" />
        <p>
          {newtime} {ampm}
        </p>
      </div>
    </div>
  );
};

export default Dayforecast;
