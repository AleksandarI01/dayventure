import Label from "../Label/Label.jsx"
import {useState} from "react";
import {axiosDayVenture} from "../../axios/index.js";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";


const UserCard = ({user}) => {
    const imageUrl = '../../../src/assets/island.png'
    const [friendRequestState, setFriendRequestState] = useState(user.sent_friendrequest_state === 'A' ? 'AS'
        : user.received_friendrequest_state === 'A' ? 'AR'
            : user.sent_friendrequest_state === 'P' ? 'PS'
                : user.received_friendrequest_state === 'P' ? 'PR'
                    : user.sent_friendrequest_state === 'R' ? 'R'
                        : user.received_friendrequest_state === 'R' ? 'R'
                        : 'D')
    const [isHovered, setIsHovered] = useState(false);
    const [friendrequestId, setFriendresquestId] = useState(user.friendrequest_id)
    const accessToken = useSelector((state) => state.user.accessToken);
    const navigate = useNavigate()

    console.log(user)
    //console.log(user.received_friendrequest_state)
    //console.log(friendRequestState)
    // console.log(user.friendrequest_id)
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
        <>
            <div
                className="card-height-width shrink-0 flex flex-col gap-[0.2rem] border border-solid rounded-md border-venture-gray">
                <div className="h-[55%] w-[100%]">
                    <div
                        className="h-[67%] w-[100%] shrink-0 flex flex-col justify-center items-center">
                        <img className={"h-20 w-20 rounded-full"} src={user?.avatar || imageUrl}
                             alt={"profile picture"}
                             onClick={() => navigate(`/profile/${user.id}`)}
                        />
                        {user.first_name || user.last_name ? <p>{user.first_name} {user.last_name}</p>
                            : <p>{user.username}</p>
                        }
                        <p>{user.location}</p>
                    </div>

                    <div
                        className="h-[33%] w-[100%] shrink-0 flex flex-row gap-[0.2rem] justify-center items-center">
                        {friendRequestState === "D" ? <button
                            className={"bg-venture-green rounded-full px-5 py-1 font-medium text-venture-white hover:bg-venture-green-hovered"}
                            onClick={onHandleUserActionClick}>
                            Send Friend Request
                        </button> : friendRequestState === "PS" ? isHovered ? <button
                                    className={"bg-venture-green rounded-full px-5 py-1 font-medium text-venture-white hover:bg-venture-red"}
                                    onClick={onHandleUserActionClick}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}>
                                    Withdraw Friend Request
                                </button> :
                                <button
                                    className={"bg-venture-green rounded-full px-5 py-1 font-medium text-venture-white hover:bg-venture-green-hovered"}
                                    // onClick={onHandleUserActionClick}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}>
                                    Friend Request Pending
                                </button>
                            : friendRequestState === "PR" ? isHovered ?
                                <div className={"flex flex-row gap-[0.2rem]"}
                                     onMouseLeave={handleMouseLeave}
                                >
                                    <button
                                        className={"bg-venture-green rounded-full px-5 py-1 font-medium text-venture-white hover:bg-venture-green-hovered"}
                                        onClick={onHandleReceiverAccept}

                                    >
                                        Accept
                                    </button>
                                    <button
                                        className={"bg-venture-red rounded-full px-5 py-1 font-medium text-venture-white hover:bg-venture-red-hovered"}
                                        onClick={onHandleReceiverReject}

                                    >
                                        Reject
                                    </button>
                                </div> : <button
                                    className={"bg-venture-green-hovered rounded-full px-5 py-1 font-medium text-venture-white"}
                                    onMouseEnter={handleMouseEnter}
                                >
                                    Friend Request Pending
                                </button> : friendRequestState === "A" || friendRequestState === "AS" || friendRequestState === "AR" ?
                                <button
                                    className={"bg-venture-green-hovered rounded-full px-5 py-1 font-medium text-venture-white"}
                                >
                                    You are friends
                                </button> : friendRequestState === "R" ? <button
                                    className={"bg-venture-red rounded-full px-5 py-1 font-medium text-venture-white"}
                                >
                                    Not friends
                                </button> : null}
                    </div>
                </div>
                <div className="h-[45%] w-[100%]">
                    <div className={"h-[68%] w-[100%]"}>
                        <p>{user.about}</p>
                    </div>
                    <div
                        className={"h-[30%] w-[100%] pb-[2%] flex flex-row shrink-0 gap-[0.2rem] justify-center items-center flex-wrap"}>
                        {user.liked_categories?.map((cat) => <Label key={cat.id}>{cat.name}</Label>)}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserCard;
