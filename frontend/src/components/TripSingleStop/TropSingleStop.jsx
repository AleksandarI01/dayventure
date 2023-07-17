import { useState } from "react";
import nycMini from "../../assets/images/nycMini.png";
import Label from "../../components/Label/Label";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdRemoveCircle } from "react-icons/md";
import { MdModeOfTravel } from "react-icons/md";
import ShowDirections from "../ShowDirections/ShowDirections";

const TripSingleStop = ({ trip }) => {
  console.log(trip, "TRIP");
  const [directions, setDirections] = useState(false);
  const [arrowClicked, setArrowClicked] = useState(false);

  const handleDirectionsClick = (event) => {
    event.preventDefault();
    console.log("click");
    setDirections(!directions);
    setArrowClicked(!arrowClicked);
  };

  const firstStop = {
    startTime: "08:30AM",
    endTime: "12:30PM",
    poiGMName: "Times Square",
    poiGMDescriotion:
      "Times Square is a major commercial intersection, tourist destination, entertainment hub, and neighborhood in Midtown Manhattan, New York City, United States. It is formed by the junction of Broad, ... REad More",
    poiGMCategories: ["Shopping", "Museum"],
  };
  return (
    <>
      <div className="flex flex-row ">
        <div className="flex flex-col w-2/12 ">
          <div className="flex flex-row w-full justify-center h-1/6">
            <h5>{trip.startTime}</h5>
          </div>
          <div className="flex flex-row h-4/6">
            <div className="flex flex-col w-1/2 border-r-2 border-venture-black"></div>
            <div className="flex flex-col w-1/2 "></div>
          </div>
          <div className="flex flex-row w-full justify-center h-1/6">
            <h5>{trip.endTime}</h5>
          </div>
        </div>
        <div className="flex flex-col w-3/12  p-2">
          <img className="" src={nycMini} />
        </div>
        <div className="flex flex-col w-6/12 ">
          <div className="flex flex-row">
            <div className="flex flex-col w-9/12 p-2 ">
              <div className="flex flex-row w-9/12">
                <h4>{trip.poiGMName}</h4>
              </div>
              <div className="flex flex-row w-9/12 "></div>
            </div>

            <div className="flex flex-row w-6/12 p-1 gap-1 ">
              {trip.poiGMCategories.map((label) => {
                return <Label>{label}</Label>;
              })}
            </div>
          </div>
          <div className="flex flex-row w-12/12 my-2 ">
            <p className="text-xs text-left">{trip.poiGMDescription}</p>
          </div>
        </div>
        <div className="flex flex-col w-1/12 justify-center ">
          <div className="flex flex-row w-full justify-center">
            <MdOutlineKeyboardArrowUp className="text-7xl text-venture-green" />
          </div>
          <div className="flex flex-row w-full justify-center">
            <MdRemoveCircle className="text-4xl text-venture-red" />
          </div>
          <div className="flex flex-row w-full justify-center">
            <MdOutlineKeyboardArrowDown className="text-7xl text-venture-green" />
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center pb-12">
        <div className="flex flex-col w-1/12 border-2 border-solid border-red-600">
          <button
            onClick={handleDirectionsClick}
            className="flex flex-row justify-around rounded-3xl bg-venture-darkgray p-1 "
          >
            <MdModeOfTravel className="text-4xl" />
            {!arrowClicked ? (
              <MdOutlineKeyboardArrowDown className="text-4xl" />
            ) : (
              <MdOutlineKeyboardArrowRight className="text-4xl" />
            )}
          </button>
        </div>

        <div className="flex flex-col w-10/12">
          {directions ? (
            <div className="flex flex-col w-full mx-10">
              <ShowDirections setDirections={setDirections} />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default TripSingleStop;
