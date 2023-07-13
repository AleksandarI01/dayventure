import Trip from "../../components/Trip/Trip.jsx"
// import ImageTrip from "../../components/ImageTrip/ImageTrip.jsx"
// import UserCard from "../../components/UserCard/UserCard.jsx";
import ProfileDescription from "../../components/ProfileDescription/ProfileDescription.jsx";

const UserProfile = () => {
    return (
        <>
            <div className={"w-full flex flex-col shrink-0 gap-6"}>
                <div className={"bg-red-400 w-full h-48 bg-no-repeat bg-cover"}>

                </div>
                <div className={"w-full flex shrink-0 justify-center items-center"}>
                    <ProfileDescription/>
                </div>
                <div className={"w-full flex shrink-0 justify-center items-center mb-[6%]"}>
                    <Trip></Trip>
                    <Trip></Trip>
                    <Trip></Trip>
                </div>


            </div>

            {/*<div className={"flex flex-row shrink-0 gap-2"}>*/}
            {/*    <ImageTrip></ImageTrip>*/}
            {/*    <UserCard></UserCard>*/}
            {/*</div>*/}
        </>
    );
};

export default UserProfile;
