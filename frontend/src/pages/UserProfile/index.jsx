// import Trip from "../../components/Trip/Trip.jsx"
// import ImageTrip from "../../components/ImageTrip/ImageTrip.jsx"
// import UserCard from "../../components/UserCard/UserCard.jsx";
import ProfileDescription from "../../components/ProfileDescription/ProfileDescription.jsx";

const UserProfile = () => {
    return (
        <>
            <div className={"flex flex-col shrink-0 gap-2 pt-[1%]"}>
                <div className={"flex shrink-0 justify-center items-center"}>
                    <ProfileDescription />


                </div>


            </div>

            {/*<div className={"flex flex-row shrink-0 gap-2"}>*/}
            {/*    <Trip></Trip>*/}
            {/*    <ImageTrip></ImageTrip>*/}
            {/*    <UserCard></UserCard>*/}
            {/*</div>*/}
        </>
    );
};

export default UserProfile;
