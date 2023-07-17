import Label from "../Label/Label.jsx"
import {useState} from "react";

const ProfileDescription = ({user, setSelectedView, setResults}) => {
    const defaultImage = '../../../src/assets/island.png'
    const activeStyle = "cursor-pointer flex h-100 py-5 float-left mx-7 border-b-4 border-1 border-solid border-venture-green"
    const inactiveStyle = "underline-effect underline-effect-color cursor-pointer flex h-100 py-5 float-left mx-7"
    const [styleMyTrips, setStyleMyTrips] = useState(activeStyle)
    const [styleFriends, setStyleFriends] = useState(inactiveStyle)
    const [styleMyFriendsTrips, setStyleMyFriendsTrips] = useState(inactiveStyle)


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

    return (
        <div
            className={"w-[800px] h-[250px] flex flex-row shrink-0 border border-solid rounded-md border-venture-gray"}>
            <div className={"h-[100%] w-[25%] flex flex-col shrink-0 border-r border-solid border-venture-gray"}>
                <div
                    className="h-[65%] w-[100%] pt-[2%] shrink-0 flex flex-col gap-[0.2rem] justify-center items-center">
                    <img className={"h-20 w-20 rounded-full"} src={user?.avatar ? user.avatar : defaultImage } alt={"profile picture"}/>
                        {user?.first_name || user?.last_name ? <p className={"pt-[2%]"}>{user.first_name} {user.last_name}</p>
                                                            : <p className={"pt-[2%]"}>{user?.username}</p>
                        }
                    <p>{user?.location}</p>


                </div>
                <div className={"h-[35%] w-[100%] shrink-0 flex flex-row justify-center items-center"}>
                    <button
                        className={
                            "bg-venture-green rounded-full px-2 py-1 font-medium text-venture-white hover:bg-venture-green-hovered"
                        }
                    >
                        EDIT PROFILE
                    </button>

                </div>

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
                {/* todo: get these numbers from backend!*/}
                <div className={"h-[40%] w-full flex flex-col shrink-0"}>
                    <div className="flex w-full justify-center items-center">
                        <ul className="list-none flex flex-row h-full">
                            <li id={"my-trips"} onClick={onHandleClickProfile}
                                className={styleMyTrips}
                            >
                                34 <br/>my trips
                            </li>
                            <li id={"my-friends"} onClick={onHandleClickProfile}
                                className={styleFriends}>
                                256 <br/>friends
                            </li>
                            <li id={"my-friends-trips"} onClick={onHandleClickProfile}
                                className={styleMyFriendsTrips}>
                                98 <br/>my friends' trips
                            </li>
                        </ul>
                    </div>


                </div>


            </div>

        </div>


    );
};

export default ProfileDescription;
