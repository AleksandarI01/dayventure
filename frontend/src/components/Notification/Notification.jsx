import UserProfileReqImage from "../../assets/images/Hot-air-balloons-take-off-from-Goreme.webp";
import { MdRemoveCircle } from "react-icons/md";
import {FiCheck} from "react-icons/fi";
import {axiosDayVenture} from "../../axios/index.js";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const Notification = ({notification, setLoadNotifications}) => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const navigate = useNavigate()

  const noteTypes = {
    0: 'You got invited to a trip!',
    1: 'Rate your passed Trip.'
  } // id: displayText

    const handleAccept = () => {
      const config = {headers: {Authorization: `Bearer ${accessToken}`}};
      axiosDayVenture
          .patch(`/notifications/${notification.id}/`, config)
          .then(() => {
              setLoadNotifications(prev => prev + 1)
          })
          .catch((error) => {
            console.log(error);
          })
      navigate(`/trip/${notification.trip.id}`)
  }

  const handleDecline = () => {
      const config = {headers: {Authorization: `Bearer ${accessToken}`}};
      if (notification.type == 0) {
          axiosDayVenture
              .patch(`/trips/companion/remove/${notification.trip.id}/`, config)
              .then(() => {
              })
              .catch((error) => {
                  console.log(error);
              })
      }
      axiosDayVenture
          .patch(`/notifications/${notification.id}/`, config)
          .then(() => {
            setLoadNotifications(prev => prev + 1)
          })
          .catch((error) => {
            console.log(error);
          })

    }

  return (
    <>
      <div className="flex flex-row w-full pt-2">
        <div className="flex flex-col justify-center items-center w-2/12">
          <img className="rounded-full w-10 h-10" src={notification?.trip.owner.avatar || UserProfileReqImage} alt='User Avatar' />
        </div>
        <div className="flex flex-col items-start  w-6/12">
          <div className="flex flex-row">
            <h6>{noteTypes[notification.type]}</h6>
          </div>
          <div className="flex flex-row">
            <p>{notification?.trip.name}</p>
          </div>
        </div>
        <div className="flex flex-row justify-evenly w-4/12">
          <div className="flex flex-col w-1/2 items-center">
            <div onClick={handleAccept} className="flex flex-col items-center justify-center my-1 rounded-full w-10 h-10 bg-venture-green">
              <FiCheck className="text-2xl text-venture-white" />
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

export default Notification;
