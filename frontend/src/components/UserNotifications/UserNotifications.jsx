import FriendRequest from "../FriendRequest/FriendRequest";
import UserProfileReqImage from "../../assets/images/Hot-air-balloons-take-off-from-Goreme.webp";
const UserNotifications = () => {
  return (
    <>
      <div className="fixed top-20 right-2 w-2/12 border-2 bg-venture-white pr-1 pl-1 pb-2 pt-2">
        <div className="flex flex-row justify-center ">
          <h5>FRIEND REQUESTS</h5>
        </div>
        <div className="flex flex-row justify-center pb-5">
          <div className="flex flex-col w-full">
            <FriendRequest />
          </div>
        </div>
        <div className="flex flex-row justify-center">
          <div className="flex flex-col w-full pb-2">
            <h5>YOU GOT INVITED TO A TRIP</h5>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col justify-center items-center w-2/12">
            <img className="rounded-full w-10 h-10" src={UserProfileReqImage} />
          </div>
          <div className="flex flex-col items-start  w-9/12">
            <div className="flex flex-row">
              <h6>Created by: Alex Ilic</h6>
            </div>
            <div className="flex flex-row">
              <p>To: Belgrade, Serbia</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserNotifications;
