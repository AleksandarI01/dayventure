import React, { useEffect, useState } from "react";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";

const ShowDirections = ({
  itineraries,
  latitute,
  destinationLatitude,
  longtitude,
  destinationLongitude,
}) => {
  const [directions, setDirections] = useState(null);
  const lat = parseFloat(latitute);
  const lng = parseFloat(longtitude);
  const destLat = parseFloat(destinationLatitude);
  const destLng = parseFloat(destinationLongitude);
  const [travelInstructions, setTravelInstructions] = useState([]);

  // const origin = { lat, lng }; // Create LatLng object for origin
  const origin = { lat, lng };
  const destination = { lat: destLat, lng: destLng }; // Create LatLng object for destination
  console.log(origin, "ORIGIN");

  const [travelMode, setTravelMode] = useState("TRANSIT");

  if (
    isNaN(lat) ||
    isNaN(lng) ||
    isNaN(destLat) ||
    isNaN(destLng) ||
    !Number.isFinite(lat) ||
    !Number.isFinite(lng) ||
    !Number.isFinite(destLat) ||
    !Number.isFinite(destLng)
  ) {
    return <div>Error: Invalid coordinates</div>;
  }

  useEffect(() => {
    const directionsService = new window.google.maps.DirectionsService();

    const origin = { lat: latitute, lng: longtitude };
    const destination = { lat: destinationLatitude, lng: destinationLongitude };

    directionsService.route(
      {
        origin,
        destination,
        travelMode: travelMode,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
          // Extract the travel instructions from the result and store them in the state
          const instructions = result.routes[0].legs[0].steps.map(
            (step) => step.instructions
          );
          const htmlInstructions = result.routes[0].legs[0].steps.map(
            (step) => step.html_instructions
          );
          setTravelInstructions(
            instructions.map((instruction, index) => ({
              instruction,
              htmlInstruction: htmlInstructions[index],
            }))
          );
        } else {
          console.error("Error fetching directions:", status);
        }
      }
    );
  }, [
    latitute,
    longtitude,
    destinationLatitude,
    destinationLongitude,
    travelMode,
  ]);

  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-col w-1/12 "></div>
        <div className="flex flex-roe w-11/12 ">
          <div className="flex flex-col w-10/12">
            <GoogleMap
              mapContainerStyle={{
                width: "100%",
                height: "400px",
              }}
              zoom={12}
              center={{ lat: latitute, lng: longtitude }} // Use the `origin` object here
              options={{
                mapTypeControl: false,
                mapTypeControlOptions: {
                  mapTypeIds: [],
                },
                fullscreenControl: false,
                streetViewControl: false,
                mapTypeId: "roadmap",
              }}
            >
              {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
          </div>
          <div className="flex flex-col items-center w-2/12 p-2">
            <div className="flex flex-row ">
              <label htmlFor="travel-mode" className="font-black text-lg">
                TRAVEL MODE:
              </label>
            </div>
            <div className="flex flex-row w-full my-2">
              <select
                className="text-sm border-1 border-x-venture-gray"
                id="travel-mode"
                value={travelMode}
                onChange={(e) => setTravelMode(e.target.value)}
              >
                <option value="DRIVING">Driving</option>
                <option value="WALKING">Walking</option>
                <option value="TRANSIT">Public Transport</option>
              </select>
            </div>
            <div className="flex flex-row my-2">
              <p className=" flex flex-row font-black text-MD">
                TRAVEL DURATION:
              </p>
            </div>
            <div className="flex flex-row">
              {directions && (
                <p>
                  {travelMode === "DRIVING"
                    ? directions.routes[0].legs[0].duration.text
                    : travelMode === "WALKING"
                    ? directions.routes[0].legs[0].duration.text
                    : travelMode === "TRANSIT"
                    ? directions.routes[0].legs[0].duration.text
                    : null}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowDirections;
