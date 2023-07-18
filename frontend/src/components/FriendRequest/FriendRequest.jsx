import UserProfileReqImage from "../../assets/images/Hot-air-balloons-take-off-from-Goreme.webp";
import { MdRemoveCircle } from "react-icons/md";
import { FiUserCheck } from "react-icons/fi";
import {axiosDayVenture} from "../../axios/index.js";
import {useSelector} from "react-redux";
const FriendRequest = ({friendRequest, setLoadNotifications}) => {
  const accessToken = useSelector((state) => state.user.accessToken);

    const handleAccept = () => {
      const config = {headers: {Authorization: `Bearer ${accessToken}`}};
      axiosDayVenture
          .patch(`/friends/requests/${friendRequest.id}/`,{state: 'A'}, config)  // A = Accepted
          .then(() => {
              setLoadNotifications(prev => prev + 1)
          })
          .catch((error) => {
            console.log(error);
          })
  }

  const handleDecline = () => {
      const config = {headers: {Authorization: `Bearer ${accessToken}`}};
      axiosDayVenture
          .patch(`/friends/requests/${friendRequest.id}/`,{state: 'R'}, config) // R = Rejected
          .then(() => {
              setLoadNotifications(prev => prev + 1)
          })
          .catch((error) => {
            console.log(error);
          })
    }
// todo: prettify together with Notification

  return (
    <>
      <div className="flex flex-row w-full pt-2">
        <div className="flex flex-col justify-center items-center w-2/12">
          <img className="rounded-full w-10 h-10" src={friendRequest?.sender.avatar || UserProfileReqImage} />
        </div>
        <div className="flex flex-col items-start  w-6/12">
          <div className="flex flex-row">
            {friendRequest?.sender.first_name || friendRequest?.sender.last_name
                ? <h6>{friendRequest?.sender.first_name} {friendRequest?.sender.last_name}</h6>
                : <h6>{friendRequest?.sender.username}</h6>
            }
          </div>
          <div className="flex flex-row">
            <p>{friendRequest?.sender.location}</p>
          </div>
        </div>
        <div className="flex flex-row justify-evenly w-4/12">
          <div className="flex flex-col w-1/2 items-center">
            <div onClick={handleAccept} className="flex flex-col items-center justify-center my-1 rounded-full w-10 h-10 bg-venture-green">
              <FiUserCheck className="text-2xl text-venture-white" />
            </div>
          </div>
          <div onClick={handleDecline} className="flex flex-col w-1/2">
            <MdRemoveCircle className="text-5xl text-venture-red" />
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendRequest;
