import Label from "../Label/Label.jsx"
import {useState} from "react";
import ProfileEditModal from '../ProfileEditModal/ProfileEditModal';
import Modal from 'react-modal';
import {axiosDayVenture} from "../../axios/index.js";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import FriendRequestButton from "../FriendRequestButton/FriendRequestButton.jsx";

const ProfileDescription = ({user, setSelectedView, setResults, isActiveUser}) => {
    const accessToken = useSelector((state) => state.user.accessToken);
    const navigate = useNavigate()

    const defaultImage = '../../../src/assets/island.png'
    const activeStyle = "cursor-pointer flex h-100 py-5 float-left mx-7 border-b-4 border-1 border-solid border-venture-green"
    const inactiveStyle = "underline-effect underline-effect-color cursor-pointer flex h-100 py-5 float-left mx-7"
    const [styleMyTrips, setStyleMyTrips] = useState(activeStyle)
    const [styleFriends, setStyleFriends] = useState(inactiveStyle)
    const [styleMyFriendsTrips, setStyleMyFriendsTrips] = useState(inactiveStyle)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [friendRequestState, setFriendRequestState] = useState(user.sent_friendrequest_state === 'A' ? 'AS'
    : user.received_friendrequest_state === 'A' ? 'AR'
        : user.sent_friendrequest_state === 'P' ? 'PS'
            : user.received_friendrequest_state === 'P' ? 'PR'
                : user.sent_friendrequest_state === 'R' ? 'R'
                    : user.received_friendrequest_state === 'R' ? 'R'
                    : 'D')
    const [friendrequestId, setFriendresquestId] = useState(user.friendrequest_id)
    const [isHovered, setIsHovered] = useState(false);


    const onHandleClickProfile = (event) => {
        event.preventDefault();
        console.log(event);
        setResults([])
        if (event.target.id === "my-trips") {
            setSelectedView('myTrips')
            setStyleMyTrips(activeStyle)
            setStyleFriends(inactiveStyle)
            setStyleMyFriendsTrips(inactiveStyle)
        } else if (event.target.id === "my-friends") {
            setSelectedView('friends')
            setStyleMyTrips(inactiveStyle)
            setStyleFriends(activeStyle)
            setStyleMyFriendsTrips(inactiveStyle)
        } else if (event.target.id === "my-friends-trips") {
            setSelectedView('friendsTrips')
            setStyleMyTrips(inactiveStyle)
            setStyleFriends(inactiveStyle)
            setStyleMyFriendsTrips(activeStyle)
        }
    }

    const onEditProfileClick = () => {
        setIsModalOpen(true);
    };

        const onHandleUserActionClick = () => {
        if (friendRequestState === "D") {
            setFriendRequestState("PS");
            handleSentFriendrequest();
        }
        if (friendRequestState === "PS") {
            setFriendRequestState("D")
            //console.log(user)
            handlePendingFriendRequestDelete();
        }
        if (friendRequestState === "P") {
            //accepting it:
            setFriendRequestState("A")
            handleReceivedFriendrequest();
        }

    }

    const onHandleReceiverAccept = () => {
        setFriendRequestState("A")
        handleReceivedFriendrequest()

    }
    const onHandleReceiverReject = () => {
        setFriendRequestState("D")
        handleReceivedFriendrequestReject()
    }

    const handleSentFriendrequest = () => {
        if (!accessToken) {
            navigate('/login/')
            return
        }
        const config = {headers: {Authorization: `Bearer ${accessToken}`}};
        axiosDayVenture
            .post(`/friends/request/${user.id}/`, {state: 'P'}, config)  // P=Pending
            .then((result) => {
                setFriendresquestId(result.data.id)
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const handlePendingFriendRequestDelete = () => {
        const config = {headers: {Authorization: `Bearer ${accessToken}`}};
        axiosDayVenture
            .delete(`/friends/requests/${friendrequestId}/`, config)  // R = Rejected
            .then(() => {
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleReceivedFriendrequest = () => {
        const config = {headers: {Authorization: `Bearer ${accessToken}`}};
        axiosDayVenture
            .patch(`/friends/requests/${user.friendrequest_id}/`, {state: 'A'}, config)  // A = Accepted
            .then(() => {

            })
            .catch((error) => {
                console.log(error);
            })

    }

    const handleReceivedFriendrequestReject = () => {
        const config = {headers: {Authorization: `Bearer ${accessToken}`}};
        axiosDayVenture
            .patch(`/friends/requests/${friendrequestId}/`, {state: 'R'}, config)  // R = Rejected
            .then(() => {
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleMouseEnter = (e) => {
        console.log(e)
        setIsHovered(true);
    }
    const handleMouseLeave = () => {
        setIsHovered(false);
    }


    return (
        <div
            className={"w-[800px] h-[250px] flex flex-row shrink-0 border border-solid rounded-md border-venture-gray"}>
            <div className={"h-[100%] w-[25%] flex flex-col shrink-0 border-r border-solid border-venture-gray"}>
                <div
                    className="h-[65%] w-[100%] pt-[2%] shrink-0 flex flex-col gap-[0.2rem] justify-center items-center">
                    <img className={"h-20 w-20 rounded-full"} src={user?.avatar || defaultImage } alt={"profile picture"}/>
                        {user?.first_name || user?.last_name ? <p className={"pt-[2%]"}>{user.first_name} {user.last_name}</p>
                                                            : <p className={"pt-[2%]"}>{user?.username}</p>
                        }
                    <p>{user?.location}</p>


                </div>
                {isActiveUser ?
                    <div className={"h-[35%] w-[100%] shrink-0 flex flex-row justify-center items-center"}>
                        <button
                            className={
                                "bg-venture-green rounded-full px-2 py-1 font-medium text-venture-white hover:bg-venture-green-hovered"
                            }
                            onClick={onEditProfileClick}
                        >
                            EDIT PROFILE
                        </button>

                    </div>
                    :
                    <FriendRequestButton user={user}/>
                }
            </div>
            <div className={"h-[100%] w-[75%] flex flex-col shrink-0"}>
                <div className={"h-[60%] w-full flex flex-row shrink-0 border-b border-solid border-venture-gray"}>
                    <div className={"h-full w-[50%] flex flex-col shrink-0 border-r border-solid border-venture-gray"}>
                        <div className={"w-full h-[15]"}>
                            <p className={"text-left p-2"}>About</p>
                        </div>
                        <div className={"w-full h-[85] flex flex-col align-start justify-start"}>
                            <p className={"text-left p-2"}>{user?.about}</p>
                        </div>
                    </div>
                    <div className={"h-full w-[50%] flex flex-col shrink-0"}>
                        <div className={"w-full h-[15]"}>
                            <p className={"text-left p-2"}>Categories I like</p>
                        </div>
                        <div
                            className={"w-full h-[85] p-1 flex flex-row gap-[0.2rem] align-start justify-start flex-wrap"}>
                        {user?.liked_categories?.map((cat) => <Label key={cat.id}>{cat.name}</Label>)}
                        </div>


                    </div>
                </div>
                <div className={"h-[40%] w-full flex flex-col shrink-0"}>
                    <div className="flex w-full justify-center items-center">
                        <ul className="list-none flex flex-row h-full">
                            <li id={"my-trips"} onClick={onHandleClickProfile}
                                className={styleMyTrips}
                            >
                                {user?.trips_count} <br/>my trips
                            </li>
                            {isActiveUser ?
                                <li id={"my-friends"} onClick={onHandleClickProfile}
                                    className={styleFriends}>
                                    {user?.friends_count} <br/>friends
                                </li>
                                : null
                            }
                            {isActiveUser ?
                                <li id={"my-friends-trips"} onClick={onHandleClickProfile}
                                    className={styleMyFriendsTrips}>
                                    {user?.friends_trips_count} <br/>my friends' trips
                                </li>
                                : null
                            }
                        </ul>
                    </div>


                </div>


            </div>
            {isModalOpen && <ProfileEditModal setIsModalOpen={setIsModalOpen} />}
        </div>


    );
};

export default ProfileDescription;
