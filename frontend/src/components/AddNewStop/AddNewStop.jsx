import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import InputField from "../../components/InputField/InputField";
import Button from "../Button/Button";
const AddNewStop = () => {
  return (
    <>
      <div className="flex flex-row w-full h-8 rounded-full bg-venture-green ">
        <div class="flex flex-col">
          <MdOutlineKeyboardArrowDown className="text-5xl text-venture-white" />
        </div>
        <h5 className="flex flex-row items-center text-venture-white px-4 font-extrabold">
          ADD NEW STOP
        </h5>
      </div>
      <form className="flex flex-col justify-center w-full py-8 gap-5">
        <div className="flex flex-row justify-center gap-5">
          <InputField
            className="flex flex-row w-full"
            placeholder={"Where do you want to go?"}
          />
          <Button>SEARCH</Button>
        </div>
        <div className="flex flex-row justify-center gap-5 ">
          <InputField
            className="flex flex-row w-full "
            placeholder={"How long you want to stay there?"}
          />
          <Button>CONFIRM</Button>
        </div>
      </form>
    </>
  );
};

export default AddNewStop;
