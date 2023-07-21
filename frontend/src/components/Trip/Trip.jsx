import Label from "../Label/Label.jsx";
import GoogleMapReact from "google-map-react";
import StarRatings from "react-star-ratings";
import { useState,useEffect } from "react";
import {axiosDayVenture} from "../../axios/index.js";

//todo: make it look nice with all the data...
const Trip = ({ trip }) => {
  const [rating, setRating] = useState(0);

  // Fetch rating when the component mounts
  useEffect(() => {
    axiosDayVenture.get(`/api/trips/${trip.id}/rating/`) // replace with the actual endpoint
      .then((res) => {
        setRating(res.data.rating);
      })
      .catch((error) => {
        console.error(error);
      })
  }, [trip.id]); // Pass `trip.id` as a dependency so that the effect runs again if `trip.id` changes

  const changeRating = (newRating) => {
    // Update the state immediately
    setRating(newRating);

    // Send the updated rating to the server
    axiosDayVenture.put(`/api/trips/${trip.id}/rating/`, { rating: newRating }) // replace with the actual endpoint
      .then((res) => {
        // If the server sends back the final rating, update it
        if (res.data.rating !== undefined) {
          setRating(res.data.rating);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };


  return (
    <>
      <div className="card-height-width shrink-0 flex flex-col gap-[0.2rem] border border-solid rounded-md border-venture-gray">
        <div className="h-[70%] w-[100%] border border-solid border-[red]"></div>
        <div className="h-[30%] w-[100%]">
          <div className="h-[40%] w-[100%] shrink-0 flex flex-row gap-[0.2rem]">
            <div className="h-[100%] w-[50%] flex flex-col ">
              <div className="h-[50%] w-[100%]">
                <p className="text-left pl-1 font-medium">{trip?.name}</p>
              </div>
              <div className="h-[50%] w-[100%]">
                <p className="text-left pl-1 font-medium">
                  Location: {trip?.location}
                </p>
              </div>
            </div>
            <div className="h-full w-1/2 border border-solid border-orange flex items-center justify-center">
              <StarRatings
                rating={rating}
                starHoverColor="#06C9A2" // venture-green-hovered
                starRatedColor="#00A987" // venture-green
                changeRating={changeRating}
                numberOfStars={5}
                name="rating"
                starDimension="20px"
                starSpacing="2px"
                starEmptyColor="#EBEBEB" // venture-gray
                starSelectingHoverColor="#FF3700" // venture-red-hovered
              />
            </div>
          </div>
          <div className="h-[60%] w-[100%] flex flex-col shrink-0">
            <div className="h-[35%] w-[100%]">
              <p className="text-left pl-1">
                created by: {trip?.owner.first_name} 4 lv
              </p>
            </div>
            <div className="h-[65%] w-[100%] pl-1 flex flex-row shrink-0 justify-center items-center gap-[0.2rem] flex-wrap">
              {trip?.categories?.map((cat) => (
                <Label key={cat.id}>{cat.name}</Label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Trip;
