import React, { useState } from "react";
import FriendRequest from "../FriendRequest/FriendRequest";
import Notification from "../Notification/Notification.jsx";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";


const getBorderStyle = (index, arrayLength) =>
  index < arrayLength - 1 ? "border-b border-gray-200 pb-2" : "";

const UserNotifications = ({
  notifications,
  friendRequests,
  setLoadNotifications,
}) => {
  const [expandView, setExpandView] = useState(false);
  const limit = 2;

  const toggleExpandView = () => {
    setExpandView(!expandView);
  }

  // Render only the number of notifications up to the limit, unless expandView is true
  const friendRequestsToRender = expandView ? friendRequests : friendRequests.slice(0, limit);
  const notificationsToRender = expandView ? notifications : notifications.slice(0, limit);
  

  return (
    <>
      <div className="z-[9998] absolute top-20 right-4 min-w-[450px] rounded shadow  bg-venture-white pr-1 pl-1 pb-1 pt-2 mt-2">
        <div className="flex justify-around bg-venture-green text-venture-white rounded p-1">
          <h4>
            Notifications ({notifications.length + friendRequests.length})
          </h4>
          <button>Mark all as Read</button>
        </div>
        <div className="flex flex-row justify-center py-2 ">
          {friendRequests.length > 0 && <h5>FRIEND REQUESTS</h5>}
        </div>
        <div className="flex flex-row justify-center  ">
          <div className="flex flex-col w-[100%]">
            {friendRequestsToRender.map((friendRequest, index) => (
              <div
                key={friendRequest.id}
                className={getBorderStyle(index, friendRequestsToRender.length)}
              >
                <FriendRequest
                  friendRequest={friendRequest}
                  setLoadNotifications={setLoadNotifications}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-row justify-center">
          <div className="flex flex-col w-full pb-2">
            {notifications.length > 0 && <h5>NOTIFICATIONS</h5>}
          </div>
        </div>
        <div className="flex flex-row justify-center pb-5">
          <div className="flex flex-col w-full">
            {notificationsToRender.map((notification, index) => (
              <div
                key={notification.id}
                className={getBorderStyle(index, notificationsToRender.length)}
              >
                <Notification
                  notification={notification}
                  setLoadNotifications={setLoadNotifications}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-venture-green text-venture-white rounded p-1 mb-1">
        
        <button onClick={toggleExpandView}>
            {expandView ? (
              <>
                View Less <MdOutlineKeyboardArrowDown className="inline align-text-bottom" style={{ fontSize: "1.5em" }} />
              </>
            ) : (
              <>
                View More <MdOutlineKeyboardArrowUp className="inline align-text-bottom" style={{ fontSize: "1.5em" }} />
              </>
            )}
          </button>
        
        </div>
      </div>
    </>
  );
};

export default UserNotifications;
