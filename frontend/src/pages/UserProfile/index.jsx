import Trip from "../../components/Trip/Trip.jsx"
import UserCard from "../../components/UserCard/UserCard.jsx"
import ProfileDescription from "../../components/ProfileDescription/ProfileDescription.jsx";
import {useState} from "react";

const UserProfile = () => {
    const [myTripsClicked, setMyTripsClicked] = useState(true)
    const [friendsClicked, setFriendsClicked] = useState(false)
    const [myFriendsTripsClicked, setMyFriendsTripsClicked] = useState(false)
    const [styleMyTrips, setStyleMyTrips] = useState("cursor-pointer flex h-100 py-5 float-left mx-7 border-b-4 border-1 border-solid border-venture-green")
    const [styleFriends, setStyleFriends] = useState("cursor-pointer flex h-100 py-5 float-left mx-7 hover:border-b-4 border-1 border-solid border-venture-green")
    const [styleMyFriendsTrips, setStyleMyFriendsTrips] = useState("cursor-pointer flex h-100 py-5 float-left mx-7 hover:border-b-4 border-1 border-solid border-venture-green")

    return (
        <>
            <div className={"w-full flex flex-col shrink-0 gap-6"}>
                <div className={"bg-red-400 w-full h-48 bg-no-repeat bg-cover"}>

                </div>
                <div className={"w-full flex shrink-0 justify-center items-center"}>
                    <ProfileDescription setMyTripsClicked={setMyTripsClicked}
                                        setFriendsClicked={setFriendsClicked}
                                        setMyFriendsTripsClicked={setMyFriendsTripsClicked}
                                        styleMyTrips={styleMyTrips} setStyleMyTrips={setStyleMyTrips}
                                        styleFriends={styleFriends} setStyleFriends={setStyleFriends}
                                        styleMyFriendsTrips={styleMyFriendsTrips}
                                        setStyleMyFriendsTrips={setStyleMyFriendsTrips}/>
                </div>
                {myTripsClicked ? <div className={"w-full flex shrink-0 justify-center items-center mb-[6%]"}>
                    <Trip></Trip>
                    <Trip></Trip>
                    <Trip></Trip>
                </div> : friendsClicked === true ?
                    <div className={"w-full flex shrink-0 justify-center items-center mb-[6%]"}>
                        <UserCard></UserCard>
                        <UserCard></UserCard>
                        <UserCard></UserCard>
                    </div> : myFriendsTripsClicked === true ?
                        <div className={"w-full flex shrink-0 justify-center items-center mb-[6%]"}>
                            <Trip></Trip>
                            <Trip></Trip>
                            <Trip></Trip>
                            <Trip></Trip>
                            <Trip></Trip>
                            <Trip></Trip>
                        </div> : null}
            </div>
        </>
    )
        ;
};

export default UserProfile;
