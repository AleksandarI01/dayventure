import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
// import { Autocomplete } from "@react-google-maps/api";
import InputField from "../../components/InputField/InputField";

const AddNewStop = ({ setTripStop }) => {
  const [autocomplete, setAutoComplete] = useState(null);
  const [destinationInput, setDestinationInput] = useState("");

  const handleConfirmNewStop = (e) => {
    console.log(">>>>>>>>>>>>>>>>>>>hello");
    e.preventDefault();
    setTripStop((current) => [
      ...current,
      {
        startTime: "08:30AM",
        endTime: "12:30PM",
        poiGMName: destinationInput,
        poiGMDescription:
          "Times Square is a major commercial intersection, tourist destination, entertainment hub, and neighborhood in Midtown Manhattan, New York City, United States. It is formed by the junction of Broad, ... REad More",
        poiGMCategories: ["Shopping", "Museum"],
      },
    ]);
  };

  const handleDestinationInputChange = (e) => {
    e.preventDefault;
    setDestinationInput(e);
  };

  return (
    <>
      <div className="flex flex-row w-full h-8 rounded-full bg-venture-green ">
        <div className="flex flex-col">
          <MdOutlineKeyboardArrowDown className="text-5xl text-venture-white" />
        </div>
        <h5 className="flex flex-row items-center text-venture-white px-4 font-extrabold">
          ADD NEW STOP
        </h5>
      </div>
      <form className="flex flex-col justify-center w-full py-8 gap-5">
        <div className="flex flex-row justify-center items-baseline gap-5">
          <p>Where do you want to go?</p>
          {/* <Autocomplete> */}
          <InputField
            onChange={handleDestinationInputChange}
            value={destinationInput}
            // onLoad={onLoad}
            onPlaceChanged={""}
            className="flex flex-row w-full"
          />
          {/* </Autocomplete> */}
        </div>
        <div className="flex flex-row items-baseline justify-center gap-5 ">
          <p>How long do you want to stay?</p>
          <InputField type="time" className="flex flex-row w-full " />
        </div>
        <button
          className="bg-venture-green rounded-full px-5 py-2 whitespace-nowrap text-venture-white hover:bg-venture-green-hovered"
          onClick={handleConfirmNewStop}
        >
          New button
        </button>
      </form>
    </>
  );
};

export default AddNewStop;
