import Button from "../../components/Button/Button";
import { useState } from "react";
import nycMini from "../../assets/images/nycMini.png";
import AddNewStop from "../../components/AddNewStop/AddNewStop";
import TripSingleStop from "../../components/TripSingleStop/TropSingleStop";
import { AiFillPlusCircle } from "react-icons/ai";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import { useSelector } from "react-redux";

const Trip = () => {
  const selectedItems = useSelector((state) => state.newTrip);
  console.log(selectedItems);
  const [addNewStop, setAddNewStop] = useState(false);
  // const coordinates = { lat: 76.09, lng: -86.09 };
  const [tripstop, setTripStop] = useState([
    {
      startTime: selectedItems.startTime,
      endTime: selectedItems.endTime,
      poiGMName: selectedItems.activityName,
      poiGMNLat: selectedItems.lat,
      poiGMNLng: selectedItems.lng,
      poiGMMeetingPoint: selectedItems.meetingPoint,
      poiGMDescription:
        "Times Square is a major commercial intersection, tourist destination, entertainment hub, and neighborhood in Midtown Manhattan, New York City, United States. It is formed by the junction of Broad, ... REad More",
      poiGMCategories: selectedItems.categories,
      poiGMImage: nycMini,
      poiGMPhoneNumber: selectedItems.phoneNumber,
      poiGMWebsite: selectedItems.website,
      poiGMRating: selectedItems.rating,
      poiGMOpeningHours: selectedItems.openingHours,
    },
  ]);

  const handleAddNewStopClick = (event) => {
    event.preventDefault();
    setAddNewStop(!addNewStop);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="w-full h-80  bg-TripHeader bg-no-repeat bg-cover">
          {/* <GoogleMapReact
            bootstrapURLKeys={{
              key: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY,
            }}
            defaultCenter={coordinates}
            center={coordinates}
            defaultZoom={14}
            margin={[50, 50, 50, 50]}
          ></GoogleMapReact> */}
        </div>
        <div className="flex flex-col w-10/12 align-center p-4">
          <h1 className="p-4">{selectedItems.tripName}</h1>
          <h2 className="p-2">Created by: UseName</h2>
          <h4 className="p-2">
            Happening on: {selectedItems.dayOfTrip} at {selectedItems.startTime}{" "}
          </h4>
        </div>
        {/* <div className="flex flex-col w-10/12 align-center">
          <h2 className="p-4">Star Rating by Aleks</h2>
        </div> */}
        <div className="flex flex-row w-4/12 justify-center gap-8 p-4">
          <Button>Share</Button>
          <Button>Add Friend</Button>
          <Button>Duplicate</Button>
          <Button onClick={""}>Delete</Button>
        </div>
        <div className="flex flex-row w-10/12 justify-center ">
          <div className="flex flex-col w-/12 align-center">
            <div className="flex flex-col w-1/2 align-center border-r-2 border-venture-darkgray  h-full"></div>
          </div>
          <div className="flex flex-col w-10/12 align-center p-4">
            {tripstop.map((trip, index) => {
              return (
                <TripSingleStop
                  key={index}
                  trip={trip}
                  tripstop={tripstop}
                  setTripStop={setTripStop}
                  index={index}
                />
              );
            })}
          </div>
        </div>
        <div className="flex flex-row w-10/12 justify-center">
          <div className="flex flex-row w-1/12 justify-center ">
            <AiFillPlusCircle
              onClick={handleAddNewStopClick}
              className="text-4xl text-venture-green hover:text-venture-green-hovered"
            />
          </div>
          <div className="flex flex-row w-10/12 align-center p-4 ">
            <div className="flex flex-col w-1/12 "></div>
            {addNewStop ? (
              <div className="flex flex-col w-9/12 ">
                <AddNewStop
                  trip={selectedItems}
                  tripstop={tripstop}
                  setTripStop={setTripStop}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Trip;
