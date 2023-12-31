import { useEffect, useState } from "react";
import nycMini from "../../assets/images/nycMini.png";
import Label from "../../components/Label/Label";
import PlacePhoto from "../../components/PlacePhoto/PlacePhoto";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdRemoveCircle } from "react-icons/md";
import { MdModeOfTravel } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { AiFillStar } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiFillClockCircle } from "react-icons/ai";
import ShowDirections from "../ShowDirections/ShowDirections";
import { axiosDayVenture } from "../../axios/index.js";
import { useSelector } from "react-redux";

const TripSingleStop = ({ trip, itinerary, itineraries, setItineraries }) => {
  console.log(itinerary, "itinerary from trip single stop");
  console.log(trip, "TRIP ON TRIP SINGLE STOP");
  const accessToken = useSelector((state) => state.user.accessToken);

  console.log(itinerary, "TRIP");
  const [directions, setDirections] = useState(false);
  const [arrowClicked, setArrowClicked] = useState(false);
  const [moveUp, setMoveUp] = useState([]);
  const [remove, setRemove] = useState([]);
  const [moveDown, setMoveDown] = useState([]);
  const isLastStop = itineraries.indexOf(itinerary) === itineraries.length - 1;

  function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}`;
  }

  const handleDirectionsClick = (event) => {
    event.preventDefault();
    console.log("click");
    setDirections(!directions);
    setArrowClicked(!arrowClicked);
  };

  const handleMoveUp = (index) => {
    // todo: calculate and set all necessary transfer_durations!
    if (index > 0) {
      const itinerary_id1 = itinerary.id;
      const itinerary_id2 = itineraries[index - 1].id;
      const sequenceNew1 = itineraries[index - 1].sequence;
      const sequenceNew2 = itinerary.sequence;
      const config = { headers: { Authorization: `Bearer ${accessToken}` } };
      axiosDayVenture
        .patch(
          `/trips/itinerary/${itinerary_id1}/`,
          { sequence: sequenceNew1 },
          config
        )
        .then(() => {
          axiosDayVenture
            .patch(
              `/trips/itinerary/${itinerary_id2}/`,
              { sequence: sequenceNew2 },
              config
            )
            .then(() => {
              itineraries[index].sequence = sequenceNew1;
              itineraries[index - 1].sequence = sequenceNew2;
              const updatedItineraries = [...itineraries];
              const temp = updatedItineraries[index];
              updatedItineraries[index] = updatedItineraries[index - 1];
              updatedItineraries[index - 1] = temp;
              setItineraries(updatedItineraries);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleMoveDown = (index) => {
    if (index < itineraries.length - 1) {
      const itinerary_id1 = itinerary.id;
      const itinerary_id2 = itineraries[index + 1].id;
      const sequenceNew1 = itineraries[index + 1].sequence;
      const sequenceNew2 = itinerary.sequence;
      const config = { headers: { Authorization: `Bearer ${accessToken}` } };
      axiosDayVenture
        .patch(
          `/trips/itinerary/${itinerary_id1}/`,
          { sequence: sequenceNew1 },
          config
        )
        .then(() => {
          axiosDayVenture
            .patch(
              `/trips/itinerary/${itinerary_id2}/`,
              { sequence: sequenceNew2 },
              config
            )
            .then(() => {
              itineraries[index].sequence = sequenceNew1;
              itineraries[index + 1].sequence = sequenceNew2;
              const updatedItineraries = [...itineraries];
              const temp = updatedItineraries[index];
              updatedItineraries[index] = updatedItineraries[index + 1];
              updatedItineraries[index + 1] = temp;
              setItineraries(updatedItineraries);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleRemove = (index) => {
    const itinerary_id = itinerary.id;
    const config = { headers: { Authorization: `Bearer ${accessToken}` } };
    axiosDayVenture
      .delete(`/trips/itinerary/${itinerary_id}/`, config)
      .then(() => {
        const updatedItineraries = [...itineraries];
        updatedItineraries.splice(index, 1);
        setItineraries(updatedItineraries);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formatTextOfCategory = (text) => {
    if (text.includes("_or_")) {
      text = text.split("_or_")[0];
      return text.charAt(0).toUpperCase() + text.slice(1);
    }
    return text
      .replace(/_/g, " ")
      .split(" ")
      .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
      .join(" ");
  };

  return (
    <>
      <div className="flex flex-row ">
        <div className="flex flex-col w-2/12 ">
          <div className="flex flex-row w-full justify-center h-1/6">
            <h5>{trip.start_time}</h5>
          </div>
          <div className="flex flex-row h-4/6">
            <div className="flex flex-col w-1/2 border-r-2 border-venture-black"></div>
            <div className="flex flex-col w-1/2 "></div>
          </div>
          <div className="flex flex-row w-full justify-center h-1/6">
            <h5>{itinerary.duration}</h5>
          </div>
        </div>
        <div className="flex flex-col items-center w-3/12 h-2/3 p-2">
          <PlacePhoto photo={itinerary.poi.gm_image} />
        </div>
        <div className="flex flex-col w-6/12 ">
          <div className="flex flex-row items-baseline ">
            <div className="flex flex-col w-9/12 p-2 ">
              <div className="flex flex-row w-full ">
                <h5 className="font-black">{itinerary.poi.name}</h5>
              </div>
              <div className="flex flex-row w-9/12 "></div>
            </div>
            <div className="flex flex-row justify-end w-6/12 p-1 gap-1 ">
              <Label>{formatTextOfCategory(itinerary.poi.gm_category)}</Label>
            </div>
          </div>

          <div className="flex flex-row p-1">
            <div className="flex flex-col justify-center items-center w-1/12 ">
              <FaMapMarkerAlt />
            </div>
            <div className="flex flex-col w-11/12">
              <p className="text-sm text-left font-extralight">
                {itinerary.poi.address}
              </p>
            </div>
          </div>
          {itinerary.poi.phone && (
            <div className="flex flex-row p-1">
              <div className="flex flex-col justify-center items-center w-1/12 ">
                <BsFillTelephoneFill />
              </div>
              <div className="flex flex-col w-11/12 ">
                <p className="text-sm text-left font-extralight ">
                  {itinerary.poi.phone}
                </p>
              </div>
            </div>
          )}
          {itinerary.poi.website && (
            <div className="flex flex-row p-1 ">
              <div className="flex flex-col justify-center items-center w-1/12  ">
                <CgWebsite />
              </div>
              <div className="flex flex-col w-11/12 ">
                <p className="text-sm text-left font-extralight ">
                  {itinerary.poi.website}
                </p>
              </div>
            </div>
          )}
          {itinerary.poi.gm_rating && (
            <div className="flex flex-row p-1 ">
              <div className="flex flex-col justify-center items-center w-1/12 ">
                <AiFillStar />
              </div>
              <div className="flex flex-col w-11/12 ">
                <p className="text-sm text-left font-extralight">
                  {itinerary.poi.gm_rating}
                </p>
              </div>
            </div>
          )}
          {itinerary.poi.opening_hours && (
            <div className="flex flex-row p-1 ">
              <div className="flex flex-col justify-center items-center w-1/12  ">
                <AiFillClockCircle />
              </div>
              <div className="flex flex-col w-11/12 ">
                <p className="text-sm text-left font-extralight ">
                  {itinerary.poi.opening_hours}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col w-1/12 justify-center ">
          <div className="flex flex-row w-full justify-center">
            <button
              onClick={() => handleMoveUp(itineraries.indexOf(itinerary))}
            >
              <MdOutlineKeyboardArrowUp className="text-7xl text-venture-green" />
            </button>
          </div>
          <div className="flex flex-row w-full justify-center">
            <button
              onClick={() => handleRemove(itineraries.indexOf(itinerary))}
            >
              <MdRemoveCircle className="text-4xl text-venture-red" />
            </button>
          </div>
          <div className="flex flex-row w-full justify-center">
            <button
              onClick={() => handleMoveDown(itineraries.indexOf(itinerary))}
            >
              <MdOutlineKeyboardArrowDown className="text-7xl text-venture-green" />
            </button>
          </div>
        </div>
      </div>
      {!isLastStop && (
        <div className="flex flex-row justify-center pb-12">
          <div className="flex flex-col w-1/12">
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
                <ShowDirections
                  setDirections={setDirections}
                  latitute={itinerary.poi.lat}
                  destinationLatitude={
                    itineraries[itineraries.indexOf(itinerary) + 1].poi.lat
                  }
                  longtitude={itinerary.poi.lng}
                  destinationLongitude={
                    itineraries[itineraries.indexOf(itinerary) + 1].poi.lng
                  }
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TripSingleStop;
