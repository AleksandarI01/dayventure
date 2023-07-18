import FriendRequest from "../FriendRequest/FriendRequest";
import Notification from "../Notification/Notification.jsx";
const UserNotifications = ({notifications, friendRequests, setLoadNotifications}) => {
  return (
    <>
      <div className="fixed top-20 right-2 w-2/12 border-2 bg-venture-white pr-1 pl-1 pb-2 pt-2">
        <div className="flex flex-row justify-center ">
          {friendRequests.length > 0 && <h5>FRIEND REQUESTS</h5>}
        </div>
        <div className="flex flex-row justify-center pb-5">
          <div className="flex flex-col w-full">
            {friendRequests.map((friendRequest) => <FriendRequest key={friendRequest.id} friendRequest={friendRequest} setLoadNotifications={setLoadNotifications}/>)}
          </div>
        </div>
        <div className="flex flex-row justify-center">
          <div className="flex flex-col w-full pb-2">
            {notifications.length > 0 && <h5>NOTIFICATIONS</h5>}
          </div>
        </div>
        <div className="flex flex-row justify-center pb-5">
          <div className="flex flex-col w-full">
            {notifications.map((notification) => <Notification key={notification.id} notification={notification} setLoadNotifications={setLoadNotifications}/>)}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserNotifications;
