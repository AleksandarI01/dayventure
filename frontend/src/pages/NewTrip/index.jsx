import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const NewTrip = () => {
  return (
    <>
      <div className="flex flex-col items-center w-full ">
        <div className="flex flex-row w-4/12 justify-center py-8 border-b-2 border-venture-green">
          <h2>CREATE A NEW DAYVENTURE</h2>
        </div>
        <div className="flex flex-row w-6/12 justify-center py-8 ">
          <div className="flex flex-row w-full justify-start h-8 rounded-full bg-venture-green">
            <div class="flex flex-col">
              <MdOutlineKeyboardArrowDown className="text-5xl text-venture-white" />
            </div>
            <h5 className="flex flex-row items-center text-venture-white font-extrabold">
              CHOOSE A DAYVENTURENAME
            </h5>
          </div>
        </div>
        <div className="flex flex-row w-6/12 justify-center py-8">
          <form className="flex flex-col justify-center w-full gap-5">
            <div className="flex flex-row justify-center gap-5 ">
              <InputField
                className="flex flex-row w-full "
                placeholder={"How long you want to stay there?"}
              />
              <Button>CONFIRM</Button>
            </div>
          </form>
        </div>
        <div className="flex flex-row w-6/12 justify-center py-8 b">
          <div className="flex flex-row w-full justify-start h-8 rounded-full bg-venture-green">
            <div class="flex flex-col">
              <MdOutlineKeyboardArrowDown className="text-5xl text-venture-white" />
            </div>
            <h5 className="flex flex-row items-center text-venture-white font-extrabold">
              CHOOSE A DAY
            </h5>
          </div>
        </div>
        <form className="flex flex-col justify-center w-full py-8 gap-5">
          <div className="flex flex-row justify-center gap-5 ">
            <InputField
              type="date"
              className="flex flex-row w-full "
              placeholder={"How long you want to stay there?"}
            />
            <Button>CONFIRM</Button>
          </div>
        </form>
        <div className="flex flex-row w-6/12 justify-center py-8">
          <div className="flex flex-row w-full justify-start h-8 rounded-full bg-venture-green">
            <div class="flex flex-col">
              <MdOutlineKeyboardArrowDown className="text-5xl text-venture-white" />
            </div>
            <h5 className="flex flex-row items-center text-venture-white font-extrabold">
              PICK A STARTING LOCATION
            </h5>
          </div>
        </div>
        <form className="flex flex-col justify-center w-full py-8 gap-5">
          <div className="flex flex-row justify-center gap-5">
            <InputField
              className="flex flex-row w-full"
              placeholder={"Where do you want to go?"}
            />
            <Button>SEARCH</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewTrip;
