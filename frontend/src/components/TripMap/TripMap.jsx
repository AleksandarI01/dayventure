import { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";

const TripMap = ({ itineraries }) => {
  const [directions, setDirections] = useState(null);
  const [travelInstructions, setTravelInstructions] = useState([]);
  const [latitute, setLatitude] = useState(0);
  const [longtitude, setLongitude] = useState(0);

  useEffect(() => {
    const directionsService = new window.google.maps.DirectionsService();
    if (itineraries) {
      const stops = itineraries.map((itinerary) => ({
        lat: itinerary.poi.lat,
        lng: itinerary.poi.lng,
      }));

      if (stops.length === 1) {
        // If there's only one stop, set it as both origin and destination
        const origin = stops[0];
        const destination = stops[0];
        const travelMode = "DRIVING"; // or "TRANSIT" if you prefer
        directionsService.route(
          {
            origin,
            destination,
            travelMode,
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
      } else if (stops.length > 1) {
        const firstStop = stops[0];
        const lastStop = stops[stops.length - 1];
        let origin = firstStop;
        let destination = lastStop;
        let waypoints = [];

        if (itineraries.length > 2) {
          // If there are intermediate stops, add them as waypoints
          waypoints = stops.slice(1, stops.length - 1).map((stop) => ({
            location: stop,
          }));
        }

        const travelMode = itineraries.length > 2 ? "DRIVING" : "TRANSIT";

        directionsService.route(
          {
            origin,
            destination,
            waypoints,
            travelMode,
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
      }
    }
  }, [itineraries]);

  return (
    <>
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "400px",
        }}
        zoom={16}
        center={{ lat: latitute, lng: longtitude }} // Use the `origin` object here
        options={{
          fullscreenControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          mapTypeControlOptions: {
            mapTypeIds: [],
          },
          mapTypeId: "roadmap",
        }}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </>
  );
};

export default TripMap;
