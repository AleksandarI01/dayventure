import ImageTrip from "../../components/ImageTrip/ImageTrip.jsx";
const AboutUs = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-KayakHomeHeader h-96 bg-no-repeat bg-cover">
      <div className="flex-col text-venture-white my-6">
        <h1>ORGANIZE YOUR PERFECT DAY-TRIP</h1>
        <h3>BY USERS, FOR USERS</h3>
      </div>
      <div className="flex flex-row w-full justify-center p-8">
        <div className="flex flex-col w-1/3 items-center">
          <ImageTrip className="text-4xl my-3" />
        </div>
        <div className="flex flex-col w-1/3 items-center">
          <ImageTrip className="text-4xl my-3" />
        </div>
        <div className="flex flex-col w-1/3 items-center">
          <ImageTrip className="text-4xl my-3" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
