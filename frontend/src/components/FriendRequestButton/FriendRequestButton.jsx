import {useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {axiosDayVenture} from "../../axios/index.js";


const FriendRequestButton = ({user}) => {
    const accessToken = useSelector((state) => state.user.accessToken);
    const navigate = useNavigate()

    const [friendRequestState, setFriendRequestState] = useState(user.sent_friendrequest_state === 'A' ? 'AS'
        : user.received_friendrequest_state === 'A' ? 'AR'
            : user.sent_friendrequest_state === 'P' ? 'PS'
                : user.received_friendrequest_state === 'P' ? 'PR'
                    : user.sent_friendrequest_state === 'R' ? 'R'
                        : user.received_friendrequest_state === 'R' ? 'R'
                        : 'D')
    const [friendrequestId, setFriendrequestId] = useState(user.friendrequest_id)
    const [isHovered, setIsHovered] = useState(false);

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
                setFriendrequestId(result.data.id)
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
        setIsHovered(true);
    }
    const handleMouseLeave = () => {
        setIsHovered(false);
    }

    return (
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
    )
}

export default FriendRequestButton;
