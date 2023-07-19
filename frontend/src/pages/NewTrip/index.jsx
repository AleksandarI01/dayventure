import React, {useEffect} from "react";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { add_trip } from "../../store/slices/newTrip";
import { Link, useNavigate } from "react-router-dom";
import TripHeader from "../../components/TripHeader/TripHeader";
import GoogleMapReact from "google-map-react";
import { Autocomplete } from "@react-google-maps/api";
import {axiosDayVenture} from "../../axios/index.js";

const NewTrip = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = useSelector((state) => state.user.accessToken);

  const [categories, setCategories] = useState([])
  const [placeId, setPlaceId] = useState("");
  const [tripName, setTripName] = useState("");
  const [tripLocation, setTripLocation] = useState("")
  const [activityName, setActivityName] = useState("");
  const currentDate = new Date().toISOString().split("T")[0];
  const [dayOfTrip, setdayOfTrip] = useState(currentDate);

  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const [startTime, setStartTime] = useState(currentTime);
  const [endTime, setEndTime] = useState(currentTime);
  const [coordinates, setCoordinates] = useState({
    lat: 46.807405,
    lng: 8.223595,
  });
  const [meetingPoint, setMeetingPoint] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [googleCategories, setGoogleCategories] = useState("");
  const [googlePhoto, setGooglePhoto] = useState("");
  const [googleRating, setGoogleRating] = useState(0);
  const [website, setWebsite] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  //const selectedItems = useSelector((state) => console.log(state.newTrip, "USESELECT"))
  const coords = { lat: 46.807405, lng: 8.223595 };
  const [autocomplete, setAutocomplete] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axiosDayVenture
        .get("/categories/")
        .then((res) => {
          setCategories(res.data.sort((catA, catB) => catB.like_count - catA.like_count));
        })
        .catch((error) => {
          console.log(error);
        })
  }, [])


  const handleAddTrip = (e) => {
    e.preventDefault();

    // Validate form fields
    if (
      !tripName.trim() ||
      !dayOfTrip ||
      !startTime ||
      !endTime ||
      !meetingPoint ||
      selectedCategories.length === 0
    ) {
      setError("Please fill in all the required fields.");
      return;
    }
    // Clear the error state if all fields are populated
    setError("");

    // create new trip in backend and then add a first itinerary to it
    const config = {headers: {Authorization: `Bearer ${accessToken}`}};
    let trip_id = null
    const trip_data = {
      name: tripName,
      location: tripLocation,
      travel_date: dayOfTrip,
      categories: selectedCategories,
    }
    const poi_data = {
      sequence: 0,
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
        opening_hours: openingHours,
        gm_image: googlePhoto
      },
      transfer: null,
      start_time: startTime,
      duration: endTime - startTime
    }
    axiosDayVenture
        .post(`/trips/new/`, trip_data, config)
        .then((res) => {
          trip_id = res.data.id
          axiosDayVenture
              .post(`/trips/${trip_id}/itinerary/new/`, poi_data, config)
              .then(() => {
                navigate(`/trip/${trip_id}/`);
              })
              .catch((error) => {
                console.log(error);
              })
        })
        .catch((error) => {
          console.log(error);
        })



    // todo: remove dispatch
    dispatch(
      add_trip({
        placeId: placeId,
        tripName: tripName,
        activityName: activityName,
        startTime: startTime,
        dayOfTrip: dayOfTrip,
        endTime: endTime,
        meetingPoint: meetingPoint,
        categories: googleCategories,
        // lat: lat,
        // lng: lng,
        // formattedAddress: formattedAddress,
        // photo: photo,
        // categories: categories,
        // rating: rating,
        // website: website,
        // openingHours: openingHours,
      })
    );

  };

  const handleCheckboxChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else if (
      selectedCategories.length < 3 ||
      selectedCategories.length === 0
    ) {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleOnChangeMeetingPoint = (e) => {
    e.preventDefault;
    setActivityName(e.target.value);
  };

  const onLoad = (autoC) => {
    setAutocomplete(autoC);
  };

  const onPlaceChanged = () => {
    const placeId = autocomplete.getPlace().place_id;
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    const activityName = autocomplete.getPlace().name;
    console.log(activityName, "ACTIVITY NAME");
    const formattedAddress = autocomplete.getPlace().formatted_address;
    const photo = autocomplete.getPlace().photos[0].getUrl();
    const categories = autocomplete.getPlace().types[0];
    const rating = autocomplete.getPlace().rating;
    const website = autocomplete.getPlace().website;
    let openingHours = {}
    if (autocomplete.getPlace().openingHours) {
      openingHours = autocomplete.getPlace().opening_hours?.weekday_text;
    }
    const localityArray = autocomplete.getPlace().address_components
    const locality = localityArray.filter(item => item.types.includes('locality'))[0].short_name
        + ', ' + localityArray.filter(item => item.types.includes('country'))[0].long_name
    console.log(autocomplete.getPlace());

    setActivityName(activityName);
    setMeetingPoint(formattedAddress);
    setCoordinates({ lat, lng });
    setGoogleCategories(categories);
    setPlaceId(placeId);
    setTripLocation(locality)
    setGoogleRating(rating)
    setGooglePhoto(photo)
    setWebsite(website)
    setOpeningHours(openingHours)
  };

  console.log(meetingPoint);

  return (
    <>
      <div className="flex flex-col items-center w-full ">
        <div className="w-full h-80">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY,
            }}
            defaultCenter={coords}
            center={coords}
            defaultZoom={7}
            margin={[50, 50, 50, 50]}
            options={""}
            onChange={""}
            onChildClick={""}
          ></GoogleMapReact>
        </div>
        <div className="flex flex-row w-4/12 justify-center py-8 border-b-2 border-venture-green">
          <h2>CREATE A NEW DAYVENTURE</h2>
        </div>

        <div className="flex flex-row w-6/12 justify-center py-8 border-2 border-solid border-red-600">
          <form
            className="flex flex-row justify-center w-full gap-5"
            onSubmit={handleAddTrip}
          >
            <div className="flex flex-col justify-center gap-5 ">
              <div className="flex flex-row justify-center gap-5 items-baseline">
                <label>Name of your trip</label>
                <InputField
                  type={"text"}
                  value={tripName}
                  onChange={(e) => setTripName(e)}
                  id={"tripName"}
                  className="flex flex-row w-full "
                  placeholder={"Name of your trip"}
                />
              </div>
              <div className="flex flex-row justify-center gap-5 items-baseline">
                <label>Date</label>
                <InputField
                  type={"date"}
                  id={"dayOfTrip"}
                  value={dayOfTrip}
                  onChange={(e) => setdayOfTrip(e)}
                  className="flex flex-row w-full"
                />
              </div>
              <div className="flex flex-row justify-center gap-5 items-baseline">
                <label>First activity start time</label>
                <InputField
                  type={"time"}
                  value={startTime}
                  onChange={(e) => setStartTime(e)}
                  className="flex flex-row w-full "
                  placeholder={"start time"}
                />
              </div>
              <div className="flex flex-row justify-center gap-5 items-baseline">
                <label>First activity end time</label>
                <InputField
                  type={"time"}
                  value={endTime}
                  onChange={(e) => setEndTime(e)}
                  className="flex flex-row w-full "
                />
              </div>
              <div className="flex flex-row justify-center gap-5 items-baseline">
                <label>Meeting Point</label>
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                  <input
                    type="text"
                    className="flex flex-row w-full"
                    placeholder={"Where do you want to go?"}
                    value={activityName}
                    onChange={handleOnChangeMeetingPoint}
                  />
                </Autocomplete>
              </div>
              <div className="flex flex-row justify-center gap-5 items-baseline">
                <label>Trip location</label>
                <InputField
                  type={"text"}
                  value={tripLocation}
                  onChange={(e) => setTripLocation(e)}
                  id={"tripLocation"}
                  className="flex flex-row w-full "
                  placeholder={"Trip location"}
                />
              </div>
              <div className="flex flex-row justify-center p-4">
                <h3>Pick a category</h3>
              </div>
              <div className="flex flex-row justify-center">
                <div className="grid grid-rows-4 grid-flow-col gap-4">

                  {categories.map(cat =>
                          <div key={cat.id} className="flex flex-row justify-start">
                            <input
                                className="mx-1"
                                type="checkbox"
                                id={cat.name}
                                checked={selectedCategories.includes(cat.id)}
                                onChange={() => handleCheckboxChange(cat.id)}
                                disabled={
                              selectedCategories.length >= 3 &&
                                    !selectedCategories.includes(cat.id)
                            }
                            />
                            <label htmlFor={cat.name}>{cat.name}</label>
                          </div>
                  )}

                </div>
              </div>
              {error && <p className="text-red-600">{error}</p>}
              <Button type={"submit"}>CONFIRM</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewTrip;
