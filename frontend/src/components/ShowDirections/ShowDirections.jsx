import React, { useEffect, useState } from "react";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";

const ShowDirections = ({
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

  const origin = { lat, lng }; // Create LatLng object for origin
  const destination = { lat: destLat, lng: destLng }; // Create LatLng object for destination
  console.log(origin, "ORIGIN");

  const [travelMode, setTravelMode] = useState("DRIVING");

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
    <div className="flex flex-row w-full border-2 border-solid border-blue-700 rounded bg-venture-gray">
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "400px",
        }}
        zoom={12}
        center={{ lat: latitute, lng: longtitude }} // Use the `origin` object here
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
      <div>
        <label htmlFor="travel-mode">Travel Mode:</label>
        <select
          id="travel-mode"
          value={travelMode}
          onChange={(e) => setTravelMode(e.target.value)}
        >
          <option value="DRIVING">Driving</option>
          <option value="WALKING">Walking</option>
          <option value="TRANSIT">Public Transport</option>
        </select>
        <div>
          <h3>Travel Instructions:</h3>
          <ol>
            {travelInstructions.map((step, index) => (
              <li key={index}>
                <p>{step.instruction}</p>
                <div
                  dangerouslySetInnerHTML={{ __html: step.htmlInstruction }}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ShowDirections;
