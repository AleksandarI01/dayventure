import SearchHeader from "../../components/SearchHeader/SearchHeader.jsx";
import Label from "../../components/Label/Label.jsx";
import UserCard from "../../components/UserCard/UserCard.jsx";
import Trip from "../../components/Trip/Trip.jsx";
import {useState} from "react";


const Search = () => {
    const activeStyleSearch = "cursor-pointer flex h-100 py-5 float-left mx-7 border-b-4 border-1 border-solid border-venture-green"
    const inactiveStyleSearch = "underline-effect underline-effect-color cursor-pointer flex h-100 py-5 float-left mx-7"
    const [userClicked, setUserClicked] = useState(true)
    const [styleUsers, setStyleUsers] = useState(activeStyleSearch)
    const [styleTrips, setStyleTrips] = useState(inactiveStyleSearch)

    const onHandleClick = (event) => {
        event.preventDefault();
        if (event.target.id === "users") {
            setUserClicked(true)
            setStyleUsers(activeStyleSearch)
            setStyleTrips(inactiveStyleSearch)
        } else {
            setUserClicked(false)
            setStyleUsers(inactiveStyleSearch)
            setStyleTrips(activeStyleSearch)
        }
    }


    return (
        <>
            <div className={"flex flex-col justify-center align-middle"}>
                <div
                    className="flex flex-col align-middle justify-center w-full items-center bg-KayakHomeHeader h-96 bg-no-repeat bg-cover">
                    <div className={"w-full h-[23%]"}>
                    </div>

                    <SearchHeader></SearchHeader>
                    <div className="flex flex-row py-3">
                        <Label>Hospitality</Label>
                        <Label>Museum</Label>
                        <Label>Shopping</Label>
                        <Label>Food</Label>
                        <Label>Sport</Label>
                        <Label>Hiking</Label>
                    </div>
                </div>
                <div className="flex w-full justify-center pt-[1%]">
                    <ul className="list-none flex flex-row h-full">
                        <li id={"users"} onClick={onHandleClick}
                            className={styleUsers}>
                            Users
                        </li>
                        <li id={"trips"} onClick={onHandleClick}
                            className={styleTrips}>
                            Day Trip Categories
                        </li>
                    </ul>
                </div>
                <div className={"w-full flex justify-center align-middle pb-[12%] pt-[2%]"}>

                    {userClicked ?
                        <div className={"flex flex-row flex-wrap justify-center align-middle w-[90%] gap-[2%]"}>
                            <UserCard></UserCard>
                            <UserCard></UserCard>
                            <UserCard></UserCard>
                            <UserCard></UserCard>
                            <UserCard></UserCard>
                            <UserCard></UserCard>
                            <UserCard></UserCard>
                            <UserCard></UserCard>
                            <UserCard></UserCard>
                            <UserCard></UserCard>

                        </div> :
                        <div className={"flex flex-row flex-wrap justify-center align-middle w-[90%] gap-[2%]"}>

                            <Trip></Trip>
                            <Trip></Trip>
                            <Trip></Trip>
                            <Trip></Trip>
                            <Trip></Trip>
                            <Trip></Trip>

                        </div>}

                </div>
            </div>

        </>
    );
};

export default Search;
