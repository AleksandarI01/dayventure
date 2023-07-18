import React from "react";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { add_trip } from "../../store/slices/newTrip";
import { Link, useNavigate } from "react-router-dom";
import TripHeader from "../../components/TripHeader/TripHeader";
import GoogleMapReact from "google-map-react";
import { Autocomplete } from "@react-google-maps/api";

const NewTrip = () => {
  const [tripName, setTripName] = useState("");
  const currentDate = new Date().toISOString().split("T")[0];
  const [dayOfTrip, setdayOfTrip] = useState(currentDate);
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const [startTime, setStartTime] = useState(currentTime);
  const [coordinates, setCoordinates] = useState({
    lat: 46.807405,
    lng: 8.223595,
  });
  const [meetingPoint, setMeetingPoint] = useState("");
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  //const selectedItems = useSelector((state) => console.log(state.newTrip, "USESELECT"))
  const navigate = useNavigate();
  const coords = { lat: 46.807405, lng: 8.223595 };
  const [autocomplete, setAutocomplete] = useState(null);

  const handleAddTrip = (e) => {
    e.preventDefault();
    if (tripName.trim()) {
      dispatch(
        add_trip({
          tripName: tripName,
          startTime: startTime,
          dayOfTrip: dayOfTrip,
          startTime: startTime,
        })
      );
    }
    navigate("/trip");
  };

  const handleOnChangeMeetingPoint = (e) => {
    e.preventDefault;
    console.log(e, "EEEEE");
  };

  const onLoad = (autoC) => {
    setAutocomplete(autoC);
  };

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    const formattedAddress = autocomplete.getPlace().formatted_address;
    setMeetingPoint(formattedAddress);
    setCoordinates({ lat, lng });
  };

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
                <label>Meeting time</label>
                <InputField
                  type={"time"}
                  value={startTime}
                  onChange={(e) => setStartTime(e)}
                  className="flex flex-row w-full "
                  placeholder={"start time"}
                />
              </div>
              <div className="flex flex-row justify-center gap-5 items-baseline">
                <label>Meeting Point</label>
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                  <InputField
                    type="text"
                    className="flex flex-row w-full"
                    placeholder={"Where do you want to go?"}
                    // value={meetingPoint}
                    // onChange={handleOnChangeMeetingPoint}
                  />
                </Autocomplete>
              </div>
              <div className="flex flex-row justify-center p-4">
                <h3>Pick a category</h3>
              </div>
              <div className="flex flex-row justify-center">
                <div className="grid grid-rows-4 grid-flow-col gap-4">
                  <div className="flex flex-row justify-start">
                    <input className="mx-1" type="checkbox" />
                    Culinary
                  </div>
                  <div className="flex flex-row justify-start">
                    {" "}
                    <input className="mx-1" type="checkbox" />
                    Shopping
                  </div>
                  <div className="flex flex-row justify-start">
                    {" "}
                    <input className="mx-1" type="checkbox" />
                    Historical
                  </div>
                  <div className="flex flex-row justify-start">
                    {" "}
                    <input className="mx-1" type="checkbox" />
                    Adventure
                  </div>
                  <div className="flex flex-row justify-start">
                    {" "}
                    <input className="mx-1" type="checkbox" />
                    Sightseeing
                  </div>
                  <div className="flex flex-row justify-start">
                    {" "}
                    <input className="mx-1" type="checkbox" />
                    Night-Life{" "}
                  </div>
                  <div className="flex flex-row justify-start">
                    {" "}
                    <input className="mx-1" type="checkbox" />
                    Sports
                  </div>
                  <div className="flex flex-row justify-start">
                    {" "}
                    <input className="mx-1" type="checkbox" />
                    Relaxation
                  </div>
                  <div className="flex flex-row justify-start">
                    {" "}
                    <input className="mx-1" type="checkbox" />
                    Culture
                  </div>
                  <div className="flex flex-row justify-start">
                    {" "}
                    <input className="mx-1" type="checkbox" />
                    Nature
                  </div>
                  <div className="flex flex-row justify-start">
                    {" "}
                    <input className="mx-1" type="checkbox" />
                    Music
                  </div>
                  <div className="flex flex-row justify-start">
                    {" "}
                    <input className="mx-1" type="checkbox" />
                    Architecture
                  </div>
                  <div className="flex flex-row justify-start">
                    {" "}
                    <input className="mx-1" type="checkbox" />
                    Family-Friendly
                  </div>
                  <div className="flex flex-row justify-start">
                    {" "}
                    <input className="mx-1" type="checkbox" />
                    Romantic
                  </div>
                </div>
              </div>
              <Button type={"submit"}>CONFIRM</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewTrip;
