import React from "react";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { add_trip } from "../../store/slices/newTrip";
import { Link, useNavigate } from "react-router-dom";
import TripHeader from "../../components/TripHeader/TripHeader";
import GoogleMapReact from "google-map-react";
import { Autocomplete } from "@react-google-maps/api";

const NewTrip = () => {
  const [placeId, setPlaceId] = useState("");
  const [userPosition, setUserPosition] = useState(null);
  const [tripName, setTripName] = useState("");
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
  const [phoneNumber, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [rating, setRating] = useState(0);
  const [openingHours, setOpeningHours] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const coords = { lat: 46.807405, lng: 8.223595 };
  const [photos, setPhotos] = useState("");
  const [autocomplete, setAutoComplete] = useState(null);
  const [error, setError] = useState("");

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

    dispatch(
      add_trip({
        place_id: placeId,
        tripName: tripName,
        activityName: activityName,
        startTime: startTime,
        dayOfTrip: dayOfTrip,
        endTime: endTime,
        meetingPoint: meetingPoint,
        categories: googleCategories,
        lat: coordinates.lat,
        lng: coordinates.lng,
        // formattedAddress: formattedAddress,
        photos: photos,
        rating: rating,
        website: website,
        phoneNumber: phoneNumber,
        openingHours: openingHours,
      })
    );
    navigate("/trip");
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
    setAutoComplete(autoC);
  };

  const getUserPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user position:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    getUserPosition();
  }, []);

  const onPlaceChanged = () => {
    const placeId = autocomplete.getPlace().place_id;
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    const activityName = autocomplete.getPlace().name;
    const formattedAddress = autocomplete.getPlace().formatted_address;
    const photos = autocomplete.getPlace().photos[0];
    const categories = autocomplete.getPlace().types[0];
    const rating = autocomplete.getPlace().rating;
    const website = autocomplete.getPlace().website;
    const phoneNumber = autocomplete.getPlace().international_phone_number;
    const openingHours = autocomplete.getPlace().opening_hours?.weekday_text;
    console.log(placeId, "PLACE ID");
    console.log(autocomplete.getPlace());
    setActivityName(activityName);
    setMeetingPoint(formattedAddress);
    setCoordinates({ lat, lng });
    setGoogleCategories(categories);
    setPlaceId(placeId);
    setPhoneNumber(phoneNumber);
    setWebsite(website);
    setRating(rating);
    setOpeningHours(openingHours);
  };

  return (
    <>
      <div className="flex flex-col items-center w-full ">
        <div className="w-full h-80">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY,
            }}
            defaultCenter={userPosition || coords}
            center={userPosition || coords}
            defaultZoom={16}
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
              <div className="flex flex-row justify-center p-4">
                <h3>Pick a category</h3>
              </div>
              <div className="flex flex-row justify-center">
                <div className="grid grid-rows-4 grid-flow-col gap-4">
                  <div className="flex flex-row justify-start">
                    <input
                      className="mx-1"
                      type="checkbox"
                      checked={selectedCategories.includes("Culinary")}
                      onChange={() => handleCheckboxChange("Culinary")}
                      disabled={
                        selectedCategories.length >= 3 &&
                        !selectedCategories.includes("Culinary")
                      }
                    />
                    Culinary
                  </div>
                  <div className="flex flex-row justify-start">
                    {" "}
                    <input
                      className="mx-1"
                      type="checkbox"
                      checked={selectedCategories.includes("Shopping")}
                      onChange={() => handleCheckboxChange("Shopping")}
                      disabled={
                        selectedCategories.length >= 3 &&
                        !selectedCategories.includes("Shopping")
                      }
                    />
                    Shopping
                  </div>
                  <div className="flex flex-row justify-start">
                    {" "}
                    <input
                      className="mx-1"
                      type="checkbox"
                      checked={selectedCategories.includes("Historical")}
                      onChange={() => handleCheckboxChange("Historical")}
                      disabled={
                        selectedCategories.length >= 3 &&
                        !selectedCategories.includes("Historical")
                      }
                    />
                    Historical
                  </div>
                  <div className="flex flex-row justify-start">
                    {" "}
                    <input
                      className="mx-1"
                      type="checkbox"
                      checked={selectedCategories.includes("Adventure")}
                      onChange={() => handleCheckboxChange("Adventure")}
                      disabled={
                        selectedCategories.length >= 3 &&
                        !selectedCategories.includes("Adventure")
                      }
                    />
                    Adventure
                  </div>
                  <div className="flex flex-row justify-start">
                    {" "}
                    <input
                      className="mx-1"
                      type="checkbox"
                      checked={selectedCategories.includes("Sightseeing")}
                      onChange={() => handleCheckboxChange("Sightseeing")}
                      disabled={
                        selectedCategories.length >= 3 &&
                        !selectedCategories.includes("Sightseeing")
                      }
                    />
                    Sightseeing
                  </div>
                  <div className="flex flex-row justify-start">
                    {" "}
                    <input
                      className="mx-1"
                      type="checkbox"
                      checked={selectedCategories.includes("Night-Life")}
                      onChange={() => handleCheckboxChange("Night-Life")}
                      disabled={
                        selectedCategories.length >= 3 &&
                        !selectedCategories.includes("Night-Life")
                      }
                    />
                    Night-Life{" "}
                  </div>
                  <div className="flex flex-row justify-start">
                    {" "}
                    <input
                      className="mx-1"
                      type="checkbox"
                      checked={selectedCategories.includes("Sports")}
                      onChange={() => handleCheckboxChange("Sports")}
                      disabled={
                        selectedCategories.length >= 3 &&
                        !selectedCategories.includes("Sports")
                      }
                    />
                    Sports
                  </div>
                  <div className="flex flex-row justify-start">
                    {" "}
                    <input
                      className="mx-1"
                      type="checkbox"
                      checked={selectedCategories.includes("Relaxation")}
                      onChange={() => handleCheckboxChange("Relaxation")}
                      disabled={
                        selectedCategories.length >= 3 &&
                        !selectedCategories.includes("Relaxation")
                      }
                    />
                    Relaxation
                  </div>
                  <div className="flex flex-row justify-start">
                    {" "}
                    <input
                      className="mx-1"
                      type="checkbox"
                      checked={selectedCategories.includes("Culture")}
                      onChange={() => handleCheckboxChange("Culture")}
                      disabled={
                        selectedCategories.length >= 3 &&
                        !selectedCategories.includes("Culture")
                      }
                    />
                    Culture
                  </div>
                  <div className="flex flex-row justify-start">
                    {" "}
                    <input
                      className="mx-1"
                      type="checkbox"
                      checked={selectedCategories.includes("Nature")}
                      onChange={() => handleCheckboxChange("Nature")}
                      disabled={
                        selectedCategories.length >= 3 &&
                        !selectedCategories.includes("Nature")
                      }
                    />
                    Nature
                  </div>
                  <div className="flex flex-row justify-start">
                    {" "}
                    <input
                      className="mx-1"
                      type="checkbox"
                      checked={selectedCategories.includes("Music")}
                      onChange={() => handleCheckboxChange("Music")}
                      disabled={
                        selectedCategories.length >= 3 &&
                        !selectedCategories.includes("Music")
                      }
                    />
                    Music
                  </div>
                  <div className="flex flex-row justify-start">
                    {" "}
                    <input
                      className="mx-1"
                      type="checkbox"
                      checked={selectedCategories.includes("Architecture")}
                      onChange={() => handleCheckboxChange("Architecture")}
                      disabled={
                        selectedCategories.length >= 3 &&
                        !selectedCategories.includes("Architecture")
                      }
                    />
                    Architecture
                  </div>
                  <div className="flex flex-row justify-start">
                    {" "}
                    <input
                      className="mx-1"
                      type="checkbox"
                      checked={selectedCategories.includes("Family-Friendly")}
                      onChange={() => handleCheckboxChange("Family-Friendly")}
                      disabled={
                        selectedCategories.length >= 3 &&
                        !selectedCategories.includes("Family-Friendly")
                      }
                    />
                    Family-Friendly
                  </div>
                  <div className="flex flex-row justify-start">
                    {" "}
                    <input
                      className="mx-1"
                      type="checkbox"
                      checked={selectedCategories.includes("Romantic")}
                      onChange={() => handleCheckboxChange("Romantic")}
                      disabled={
                        selectedCategories.length >= 3 &&
                        !selectedCategories.includes("Romantic")
                      }
                    />
                    Romantic
                  </div>
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
