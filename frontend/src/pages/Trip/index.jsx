import Button from "../../components/Button/Button";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import nycMini from "../../assets/images/nycMini.png";
import AddNewStop from "../../components/AddNewStop/AddNewStop";
import TripSingleStop from "../../components/TripSingleStop/TropSingleStop";
import { AiFillPlusCircle } from "react-icons/ai";
import GoogleMapReact from "google-map-react";

const Trip = () => {
  const [addNewStop, setAddNewStop] = useState(false);
  const coordinates = { lat: 76.09, lng: -86.09 };
  const [tripstop, setTripStop] = useState([
    {
      startTime: "08:30AM",
      endTime: "12:30PM",
      poiGMName: "Times Square",
      poiGMDescription:
        "Times Square is a major commercial intersection, tourist destination, entertainment hub, and neighborhood in Midtown Manhattan, New York City, United States. It is formed by the junction of Broad, ... REad More",
      poiGMCategories: ["Shopping", "Museum"],
      poiGMImage: nycMini,
    },
  ]);
  const history = useHistory();

  const handleDeleteTrip = (event) => {
    event.preventDefault();
    // Perform the deletion logic here
    console.log("I WANT TO DELETE THE TRIP");
    // Redirect to the user profile page
    history.push("/user-profile"); // Replace "/user-profile" with the actual route for the user profile page
  };

  const handleAddNewStopClick = (event) => {
    event.preventDefault();
    setAddNewStop(!addNewStop);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="w-full h-80  bg-TripHeader bg-no-repeat bg-cover">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY,
            }}
            defaultCenter={coordinates}
            center={coordinates}
            defaultZoom={14}
            margin={[50, 50, 50, 50]}
          ></GoogleMapReact>
        </div>
        <div className="flex flex-col w-10/12 align-center p-4">
          <h1 className="p-4">My NYC Trip</h1>
          <h2 className="p-2">Created by: UseName</h2>
        </div>
        <div className="flex flex-col w-10/12 align-center">
          <h2 className="p-4">Star Rating by Aleks</h2>
        </div>
        <div className="flex flex-row w-4/12 justify-center gap-8 p-4">
          <Button>Share</Button>
          <Button>Add Friend</Button>
          <Button>Duplicate</Button>
          <Button onClickFunction={handleDeleteTrip}>Delete</Button>
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
                <AddNewStop setTripStop={setTripStop} />
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
