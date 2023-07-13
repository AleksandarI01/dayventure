import SearchHeader from "../../components/SearchHeader/SearchHeader";
import ImageTrip from "../../components/ImageTrip/ImageTrip.jsx";
import Label from "../../components/Label/Label";
import NycMet from "../../assets/images/MetNYC.png";
import { MdShare } from "react-icons/md";

const Home = () => {
  return (
    <>
      <div className="flex flex-col align-middle justify-center w-full items-center bg-KayakHomeHeader h-96 bg-no-repeat bg-cover">
        <h1 className="flex text-venture-white my-6">
          ORGANIZE YOUR PERFECT DAY-TRIP
        </h1>
        <SearchHeader />
        <div className="flex flex-row py-3">
          <Label>Hospitality</Label>
          <Label>Museum</Label>
          <Label>Shopping</Label>
          <Label>Food</Label>
          <Label>Sport</Label>
          <Label>Hiking</Label>
        </div>
      </div>
      <div className="flex flex-row w-full justify-center ">
        <div className="flex flex-col w-8/12 align-center">
          <div className="flex w-full  py-10">
            <h2>Popular dayventures</h2>
          </div>
          <div className="flex w-full justify-start">
            <ul classname="list-none flex flex-row h-full">
              <li className="flex h-100 py-5 float-left mx-7 hover:border-b-4 border-1 border-solid border-venture-green">
                Food
              </li>
              <li className="flex h-100 py-5 float-left mx-7 hover:border-b-4 border-1 border-solid border-venture-green">
                Shopping
              </li>
              <li className="flex h-100 py-5 float-left mx-7 hover:border-b-4 border-1 border-solid border-venture-green">
                Museums
              </li>
              <li className="flex h-100 py-5 float-left mx-7 hover:border-b-4 border-1 border-solid border-venture-green">
                History
              </li>
              <li className="flex h-100 py-5 float-left mx-7 hover:border-b-4 border-1 border-solid border-venture-green">
                Ghost
              </li>
            </ul>
          </div>

          <div className="flex flex-row w-full p-8">
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
          <div className="flex flex-row w-full p-8">
            <div className="flex flex-col w-1/3 items-center">
              <MdShare className="text-4xl my-3" />
              <h4>Easy Itinerary Planning</h4>
            </div>
            <div className="flex flex-col w-1/3 items-center">
              <MdShare className="text-4xl my-3" />
              <h4>Invite Your Friends</h4>
            </div>
            <div className="flex flex-col w-1/3 items-center">
              <MdShare className="text-4xl my-3" />
              <h4 className="m-2">Estimate Trip Expenses</h4>
            </div>
          </div>
          <div className="flex flex-row w-full bg-gradient-to-b from-venture-white to-venture-green">
            <div className="flex flex-col w-1/2">
              <img src={NycMet} />
            </div>
            <div className="flex flex-col justify-center w-1/2">
              <div className="py-4">
                <h3>How it works</h3>
                <p className="p-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  in malesuada lacus. Cras non pulvinar ex, a posuere leo.
                </p>
                <p className="p-4">
                  Sed congue erat vel arcu dignissim gravida. Pellentesque sit
                  amet est urna.
                </p>
                <p className="p-4">
                  Sed tempus tempor lacus eu volutpat. Donec fermentum maximus
                  eros, sed placerat nulla congue id.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
