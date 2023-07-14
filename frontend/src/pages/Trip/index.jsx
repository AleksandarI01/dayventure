import Button from "../../components/Button/Button";
import { useState } from "react";
import TripHeader from "../../components/TripHeader/TripHeader";
import AddNewStop from "../../components/AddNewStop/AddNewStop";
import TripSingleStop from "../../components/TripSingleStop/TropSingleStop";
import { AiFillPlusCircle } from "react-icons/ai";
const Trip = () => {
  const [addNewStop, setAddNewStop] = useState(false);

  const handleAddNewStopClick = (event) => {
    event.preventDefault();
    setAddNewStop(!addNewStop);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="w-full">
          <TripHeader />
        </div>
        <div className="flex flex-col w-10/12 align-center p-4">
          <h1 className="p-4">My NYC Trip</h1>
          <h2 className="p-2">Created by: Me</h2>
        </div>
        <div className="flex flex-col w-10/12 align-center">
          <h2 className="p-4">Star Rating by Aleks</h2>
        </div>
        <div className="flex flex-row w-4/12 justify-center gap-8 p-4">
          <Button>Share</Button>
          <Button>Add Friend</Button>
          <Button>Duplicate</Button>
          <Button>Delete</Button>
        </div>
        <div className="flex flex-row w-10/12 justify-center ">
          <div className="flex flex-col w-/12 align-center">
            <div className="flex flex-col w-1/2 align-center border-r-2 border-venture-darkgray  h-full"></div>
          </div>
          <div className="flex flex-col w-10/12 align-center p-4">
            <TripSingleStop />
          </div>
        </div>
        <div className="flex flex-row w-10/12 justify-center">
          <div className="flex flex-row w-1/12 justify-center ">
            <AiFillPlusCircle
              onClick={handleAddNewStopClick}
              className="text-4xl text-venture-green hover:text-venture-green-hovered"
            />
          </div>
          <div className="flex flex-row w-10/12 align-center p-4 ">
            <div className="flex flex-col w-1/12 "></div>
            {addNewStop ? (
              <div className="flex flex-col w-9/12 ">
                <AddNewStop />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Trip;
