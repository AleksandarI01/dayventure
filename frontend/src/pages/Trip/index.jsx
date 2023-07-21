import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";
import Button from "../../components/Button/Button";
import TripMap from "../../components/TripMap/TripMap.jsx";
import AddNewStop from "../../components/AddNewStop/AddNewStop";
import TripSingleStop from "../../components/TripSingleStop/TripSingleStop.jsx";
import { axiosDayVenture } from "../../axios/index.js";

const Trip = () => {
  const { tripId } = useParams();
  const accessToken = useSelector((state) => state.user.accessToken);
  const [trip, setTrip] = useState(null);
  const [addNewStop, setAddNewStop] = useState(false);
  const [itineraries, setItineraries] = useState([]);

  useEffect(() => {
    if (tripId) {
      let config = null;
      if (accessToken) {
        config = { headers: { Authorization: `Bearer ${accessToken}` } };
      }
      let url = `/trips/${tripId}`;
      axiosDayVenture
        .get(url, config)
        .then((res) => {
          setTrip(res.data);
          setItineraries(
            res.data.itineraries.sort((itA, itB) => itA.sequence - itB.sequence)
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [accessToken, tripId]);

  const handleAddNewStopClick = (event) => {
    event.preventDefault();
    setAddNewStop(!addNewStop);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="w-full h-80 relative">
          <TripMap itineraries={itineraries} />
        </div>
        <div className="flex flex-col w-10/12 align-center p-4">
          <h1 className="p-4">{trip?.name}</h1>
          <h2 className="p-2">Created by: {trip?.owner.username}</h2>
          <h4 className="p-2">
            Starting on: {trip?.travel_date} at {itineraries[0]?.start_time}{" "}
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
            {itineraries.map((itinerary, index) => {
              return (
                <TripSingleStop
                  key={index}
                  itinerary={itinerary}
                  itineraries={itineraries}
                  setItineraries={setItineraries}
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
                  trip={trip}
                  itineraries={itineraries}
                  setItineraries={setItineraries}
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
