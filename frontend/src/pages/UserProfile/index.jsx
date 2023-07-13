import Trip from "../../components/Trip/Trip.jsx"
import ProfileDescription from "../../components/ProfileDescription/ProfileDescription.jsx";
import {useState} from "react";

const UserProfile = () => {
    const [userClicked, setUserClicked] = useState(true)
    const [styleUsers, setStyleUsers] = useState("flex h-100 py-5 float-left mx-7 border-b-4 border-1 border-solid border-venture-green")
    const [styleTrips, setStyleTrips] = useState("flex h-100 py-5 float-left mx-7 hover:border-b-4 border-1 border-solid border-venture-green")

    return (
        <>
            <div className={"w-full flex flex-col shrink-0 gap-6"}>
                <div className={"bg-red-400 w-full h-48 bg-no-repeat bg-cover"}>

                </div>
                <div className={"w-full flex shrink-0 justify-center items-center"}>
                    <ProfileDescription setUserClicked={setUserClicked} userClicked={userClicked} styleUsers={styleUsers} styleTrips={styleTrips}/>
                </div>
                <div className={"w-full flex shrink-0 justify-center items-center mb-[6%]"}>
                    <Trip></Trip>
                    <Trip></Trip>
                    <Trip></Trip>
                </div>


            </div>
        </>
    );
};

export default UserProfile;
