import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Autocomplete } from "@react-google-maps/api";
import InputField from "../../components/InputField/InputField";
import { axiosDayVenture } from "../../axios/index.js";
import { useSelector } from "react-redux";

const AddNewStop = ({ trip, itineraries, setItineraries }) => {
  const accessToken = useSelector((state) => state.user.accessToken);

  const [autocomplete, setAutoComplete] = useState(null);
  const [activityName, setActivityName] = useState("");
  const [activityDurationTime, setActivityDurationTime] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [tripName, setTripName] = useState("");
  const currentDate = new Date().toISOString().split("T")[0];
  const [dayOfTrip, setdayOfTrip] = useState(currentDate);
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const [duration, setDuration] = useState();
  const [coordinates, setCoordinates] = useState({
    lat: 46.807405,
    lng: 8.223595,
  });
  const [meetingPoint, setMeetingPoint] = useState("");
  const [googleCategories, setGoogleCategories] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [googleRating, setGoogleRating] = useState(0);
  const [googlePhoto, setGooglePhoto] = useState("");
  const [openingHours, setOpeningHours] = useState([]);
  const coords = { lat: 46.807405, lng: 8.223595 };
  const [error, setError] = useState("");

  const handleConfirmNewStop = (e) => {
    console.log(">>>>>>>>>>>>>>>>>>>hello");
    e.preventDefault();

    // create new itinerary in BE
    const config = { headers: { Authorization: `Bearer ${accessToken}` } };
    let trip_id = trip.id;
    const nextSequence = Math.max(...itineraries.map(itin => itin.sequence)) + 1
    const poi_data = {
      sequence: nextSequence,
      type: 0,
      poi: {
        name: activityName,
        gm_place_id: placeId,
        address: meetingPoint,
        lat: coordinates.lat,
        lng: coordinates.lng,
        gm_category: googleCategories,
        gm_rating: googleRating,
        website: website,
        phone: phoneNumber,
        opening_hours: openingHours,
        gm_image: googlePhoto,
      },
      transfer: 1, // [1(default): Public transport, 2: Car, 3: by Foot] todo: do we want to send something here?,
      // transfer_duration: XXX,   // todo: needs to be calculated!
      duration: duration,
    };

    axiosDayVenture
      .post(`/trips/${trip_id}/itinerary/new/`, poi_data, config)
      .then((res) => {
        poi_data["id"] = res.data.id;
        setItineraries((current) => [...current, poi_data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOnChangeMeetingPoint = (e) => {
    e.preventDefault;
    setActivityName(e.target.value);
    console.log(e.target.value);
  };

  const onLoad = (autoC) => {
    setAutoComplete(autoC);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      const placeId = autocomplete.getPlace().place_id;
      const lat = autocomplete.getPlace().geometry.location.lat();
      const lng = autocomplete.getPlace().geometry.location.lng();
      const activityName = autocomplete.getPlace().name;
      console.log(activityName, "ACTIVITY NAME");
      const formattedAddress = autocomplete.getPlace().formatted_address;
      const photos = autocomplete.getPlace().photos[0].getUrl();
      const categories = autocomplete.getPlace().types[0];
      const rating = autocomplete.getPlace().rating;
      const website = autocomplete.getPlace().website;
      console.log(website, "WEBSITE");
      const phoneNumber = autocomplete.getPlace().international_phone_number;
      console.log(phoneNumber, "international_phone_number");
      const openingHours = autocomplete.getPlace().opening_hours?.weekday_text;
      console.log(
        autocomplete.getPlace().opening_hours?.weekday_text,
        "OPENING HOURS"
      );
      console.log(autocomplete.getPlace());
      setActivityName(activityName);
      setMeetingPoint(formattedAddress);
      setCoordinates({ lat, lng });
      setGoogleCategories(categories);
      setPlaceId(placeId);
      setPhoneNumber(phoneNumber);
      setWebsite(website);
      setGoogleRating(rating);
      setOpeningHours(openingHours);
      setGooglePhoto(photos);
    } else {
      // Handle the case when autocomplete is null (optional)
      console.error("Autocomplete is not ready yet.");
    }
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
          <Autocomplete
            onLoad={onLoad}
            onPlaceChanged={autocomplete && onPlaceChanged}
          >
            <input
              type="text"
              value={activityName}
              onChange={handleOnChangeMeetingPoint}
              className="flex flex-row w-full"
            />
          </Autocomplete>
        </div>
        <div className="flex flex-row items-baseline justify-center gap-5 ">
          <p>How long do you want to stay?</p>
          <InputField type="time"
                      className="flex flex-row w-full "
                      value={duration}
                      onChange={setDuration}
          />
        </div>
        <button
          className="bg-venture-green rounded-full px-5 py-2 whitespace-nowrap text-venture-white hover:bg-venture-green-hovered"
          onClick={handleConfirmNewStop}
        >
          CONFIRM
        </button>
      </form>
    </>
  );
};

export default AddNewStop;
