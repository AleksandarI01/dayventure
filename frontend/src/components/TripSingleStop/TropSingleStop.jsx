import nycMini from "../../assets/images/nycMini.png";
import Label from "../../components/Label/Label";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdRemoveCircle } from "react-icons/md";
import { MdModeOfTravel } from "react-icons/md";
const TripSingleStop = () => {
  return (
    <>
      <div className="flex flex-row ">
        <div className="flex flex-col w-2/12 ">
          <div className="flex flex-row w-full justify-center h-1/6">
            <h5>08:30AM</h5>
          </div>
          <div className="flex flex-row h-4/6">
            <div className="flex flex-col w-1/2 border-r-2 border-venture-black"></div>
            <div className="flex flex-col w-1/2 "></div>
          </div>
          <div className="flex flex-row w-full justify-center h-1/6">
            <h5>12:30PM</h5>
          </div>
        </div>
        <div className="flex flex-col w-3/12  p-2">
          <img className="" src={nycMini} />
        </div>
        <div className="flex flex-col w-6/12 ">
          <div className="flex flex-row">
            <div className="flex flex-col w-9/12 p-2 ">
              <div className="flex flex-row w-9/12">
                <h4>Times Square</h4>
              </div>
              <div className="flex flex-row w-9/12 ">
                <p className="text-xs">Manhattan, NY, United States</p>
              </div>
            </div>

            <div className="flex flex-row w-6/12 p-1 gap-1 ">
              <Label>Shopping</Label>
              <Label>Museum</Label>
            </div>
          </div>
          <div className="flex flex-row w-12/12 my-2 ">
            <p className="text-xs text-left">
              Times Square is a major commercial intersection, tourist
              destination, entertainment hub, and neighborhood in Midtown
              Manhattan, New York City, United States. It is formed by the
              junction of Broad, ... REad More
            </p>
          </div>
        </div>
        <div className="flex flex-col w-1/12 justify-center ">
          <div className="flex flex-row w-full justify-center">
            <MdOutlineKeyboardArrowUp className="text-7xl text-venture-green" />
          </div>
          <div className="flex flex-row w-full justify-center">
            <MdRemoveCircle className="text-4xl text-venture-red" />
          </div>
          <div className="flex flex-row w-full justify-center">
            <MdOutlineKeyboardArrowDown className="text-7xl text-venture-green" />
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center">
        <div className="flex flex-col w-1/12">
          <div className="flex flex-row justify-around rounded-3xl bg-venture-darkgray p-1">
            <MdModeOfTravel className="text-4xl" />
            <MdOutlineKeyboardArrowDown className="text-4xl" />
          </div>
        </div>
        <div className="flex flex-col w-10/12 0"></div>
      </div>
    </>
  );
};

export default TripSingleStop;
