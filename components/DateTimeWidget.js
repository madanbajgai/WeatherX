import Clock from "react-live-clock";

const DateTimeWidget = () => {
  return (
    <>
      <Clock format={"YYYY-MMMM-DD"} /> <br />
      <Clock format={"h : mm : ss A"} ticking={true} />
      <Clock format={", dddd"} />
    </>
  );
};

export default DateTimeWidget;
