import Image from "next/image";

const Weatherdata = ({ icon, value, type, darkmode }) => {
  return (
    <div className="py-2">
      <div
        className=" mx-2 flex flex-col items-center rounded-md p-2"
        style={
          darkmode ? { backgroundColor: "black" } : { backgroundColor: "white" }
        }
      >
        <Image src={icon} width={20} height={20} />
        <p>{value}</p>
        <p>{type}</p>
      </div>
    </div>
  );
};

export default Weatherdata;
