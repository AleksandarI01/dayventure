import { useEffect, useState } from "react";
import nycMini from "../../assets/images/nycMini.png";
import Label from "../../components/Label/Label";
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

const TripSingleStop = ({ itinerary, itineraries, setItineraries }) => {
  console.log(itinerary, "TRIP");
  const [directions, setDirections] = useState(false);
  const [arrowClicked, setArrowClicked] = useState(false);
  const [moveUp, setMoveUp] = useState([]);
  const [remove, setRemove] = useState([]);
  const [moveDown, setMoveDown] = useState([]);
  const isLastStop = itineraries.indexOf(itinerary) === itineraries.length - 1;

  const handleDirectionsClick = (event) => {
    event.preventDefault();
    console.log("click");
    setDirections(!directions);
    setArrowClicked(!arrowClicked);
  };

  const PlacePhoto = ({ placeId }) => {
    const [photoUrl, setPhotoUrl] = useState("");
  
    useEffect(() => {
      if (!placeId) return;
  
      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );
  
      service.getDetails(
        {
          placeId: placeId,
          fields: ["photos"],
        },
        (place, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            if (place.photos && place.photos.length > 0) {
              const photo = place.photos[0];
              const photoUrl = photo.getUrl({
                maxWidth: 400, // Set the maximum width for the photo
              });
              setPhotoUrl(photoUrl);
            }
          }
        }
      );
    }, [placeId]);

    return (
      <div>
        {photoUrl && <img src={photoUrl} alt="Place" />}
        {!photoUrl && <div>No photo available</div>}
      </div>
    );
  };

  const handleMoveUp = (index) => {  // todo: handle this in backend!
    if (index > 0) {
      const updatedItineraries = [...itineraries];
      const temp = updatedItineraries[index];
      updatedItineraries[index] = updatedItineraries[index - 1];
      updatedItineraries[index - 1] = temp;
      setItineraries(updatedItineraries);
    }
  };

  const handleMoveDown = (index) => {  // todo: handle this in backend!
    if (index < itineraries.length - 1) {
      const updatedItineraries = [...itineraries];
      const temp = updatedItineraries[index];
      updatedItineraries[index] = updatedItineraries[index + 1];
      updatedItineraries[index + 1] = temp;
      setItineraries(updatedItineraries);
    }
  };

  const handleRemove = (index) => {  // todo: handle this in backend!
    const updatedItineraries = [...itineraries];
    updatedItineraries.splice(index, 1);
    setItineraries(updatedItineraries);
  };

  // const firstStop = {
  //   startTime: "08:30AM",
  //   endTime: "12:30PM",
  //   poiGMName: "Times Square",
  //   poiGMDescriotion:
  //     "Times Square is a major commercial intersection, tourist destination, entertainment hub, and neighborhood in Midtown Manhattan, New York City, United States. It is formed by the junction of Broad, ... REad More",
  //   poiGMCategories: ["Shopping", "Museum"],
  //   poiGMPhoneNumber: itinerary.poi.phone,
  // };

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
            <h5>{itinerary.start_time}</h5>
          </div>
          <div className="flex flex-row h-4/6">
            <div className="flex flex-col w-1/2 border-r-2 border-venture-black"></div>
            <div className="flex flex-col w-1/2 "></div>
          </div>
          <div className="flex flex-row w-full justify-center h-1/6">
            <h5>{itinerary.end_time}</h5>
          </div>
        </div>
        <div className="flex flex-col w-3/12  p-2">
          <img className="" src={itinerary.image || itinerary.gm_image || nycMini} />
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

          <div className="flex flex-row p-1 border-2 border-solid border-red-600">
            <div className="flex flex-col justify-center items-center w-1/12 border-2 border-solid border-blue-600 ">
              <FaMapMarkerAlt />
            </div>
            <div className="flex flex-col w-11/12 border-2 border-solid border-green-600">
              <p className="text-sm text-left font-extralight border-2 border-solid border-green-600">
                {itinerary.poi.address}
              </p>
            </div>
          </div>
          {itinerary.poi.phone && (
            <div className="flex flex-row p-1 border-2 border-solid border-red-600">
              <div className="flex flex-col justify-center items-center w-1/12 border-2 border-solid border-blue-600 ">
                <BsFillTelephoneFill />
              </div>
              <div className="flex flex-col w-11/12 border-2 border-solid border-green-600">
                <p className="text-sm text-left font-extralight border-2 border-solid border-green-600">
                  {itinerary.poi.phone}
                </p>
              </div>
            </div>
          )}
          {itinerary.poi.website && (
            <div className="flex flex-row p-1 border-2 border-solid border-red-600">
              <div className="flex flex-col justify-center items-center w-1/12 border-2 border-solid border-blue-600 ">
                <CgWebsite />
              </div>
              <div className="flex flex-col w-11/12 border-2 border-solid border-green-600">
                <p className="text-sm text-left font-extralight border-2 border-solid border-green-600">
                  {itinerary.poi.website}
                </p>
              </div>
            </div>
          )}
          {itinerary.poi.gm_rating && (
            <div className="flex flex-row p-1 border-2 border-solid border-red-600">
              <div className="flex flex-col justify-center items-center w-1/12 border-2 border-solid border-blue-600 ">
                <AiFillStar />
              </div>
              <div className="flex flex-col w-11/12 border-2 border-solid border-green-600">
                <p className="text-sm text-left font-extralight border-2 border-solid border-green-600">
                  {itinerary.poi.gm_rating}
                </p>
              </div>
            </div>
          )}
          {itinerary.poi.opening_hours && (
            <div className="flex flex-row p-1 border-2 border-solid border-red-600">
              <div className="flex flex-col justify-center items-center w-1/12 border-2 border-solid border-blue-600 ">
                <AiFillClockCircle />
              </div>
              <div className="flex flex-col w-11/12 border-2 border-solid border-green-600">
                <p className="text-sm text-left font-extralight border-2 border-solid border-green-600">
                  {itinerary.poi.opening_hours}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col w-1/12 justify-center ">
          <div className="flex flex-row w-full justify-center">
            <button onClick={() => handleMoveUp(itineraries.indexOf(itinerary))}>
              <MdOutlineKeyboardArrowUp className="text-7xl text-venture-green" />
            </button>
          </div>
          <div className="flex flex-row w-full justify-center">
            <button onClick={() => handleRemove(itineraries.indexOf(itinerary))}>
              <MdRemoveCircle className="text-4xl text-venture-red" />
            </button>
          </div>
          <div className="flex flex-row w-full justify-center">
            <button onClick={() => handleMoveDown(itineraries.indexOf(itinerary))}>
              <MdOutlineKeyboardArrowDown className="text-7xl text-venture-green" />
            </button>
          </div>
        </div>
      </div>
      {!isLastStop && (
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
