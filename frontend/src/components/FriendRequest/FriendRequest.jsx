import UserProfileReqImage from "../../assets/images/Hot-air-balloons-take-off-from-Goreme.webp";
import { MdRemoveCircle } from "react-icons/md";
import { FiUserCheck } from "react-icons/fi";
const FriendRequest = () => {
  return (
    <>
      <div className="flex flex-row w-full pt-2">
        <div className="flex flex-col justify-center items-center w-2/12">
          <img className="rounded-full w-10 h-10" src={UserProfileReqImage} />
        </div>
        <div className="flex flex-col items-start  w-6/12">
          <div className="flex flex-row">
            <h6>Alex Ilic</h6>
          </div>
          <div className="flex flex-row">
            <p>Belgrade, Serbia</p>
          </div>
        </div>
        <div className="flex flex-row justify-evenly w-4/12">
          <div className="flex flex-col w-1/2 items-center">
            <div className="flex flex-col items-center justify-center my-1 rounded-full w-10 h-10 bg-venture-green">
              <FiUserCheck className="text-2xl text-venture-white" />
            </div>
          </div>
          <div className="flex flex-col w-1/2">
            <MdRemoveCircle className="text-5xl text-venture-red" />
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendRequest;
