import Trip from "../../components/Trip/Trip.jsx"
import UserCard from "../../components/UserCard/UserCard.jsx"
import ProfileDescription from "../../components/ProfileDescription/ProfileDescription.jsx";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {axiosDayVenture} from "../../axios/index.js";

const UserProfile = () => {
    const accessToken = useSelector((state) => state.user.accessToken);

    const [results, setResults] = useState([])
    const [selectedView, setSelectedView] = useState('myTrips')

    useEffect(() => {
        let url = '/trips/'
        switch (selectedView) {
            case 'myTrips':
                url = '/trips/my/';
                break;
            case 'friendsTrips':
                url = '/trips/friends/';
                break;
            case 'friends':
                url = '/friends/';
                break;
            default:
                console.log(`How did we get here? ${selectedView}`)
        }
        const config = {headers: {Authorization: `Bearer ${accessToken}`}};
        axiosDayVenture
            .get(url, config)
            .then((res) => {
                console.log(res.data);
                setResults(res.data)
            })
            .catch((error) => {
                console.log(error);
            })

    }, [accessToken, selectedView])

    return (
        <>
            <div className={"w-full flex flex-col shrink-0 gap-6"}>
                <div className={"bg-red-400 w-full h-48 bg-no-repeat bg-cover"}>
                </div>
                <div className={"w-full flex shrink-0 justify-center items-center"}>
                    <ProfileDescription setSelectedView={setSelectedView} setResults={setResults}/>
                </div>
                {selectedView === 'myTrips' || selectedView === 'friendsTrips' ?
                    <div className={"w-full flex shrink-0 justify-center items-center mb-[6%]"}>
                            {results.map((trip) => <Trip key={trip.id} trip={trip}/>)}
                    </div> : null }
                {selectedView === 'friends' ?
                    <div className={"w-full flex shrink-0 justify-center items-center mb-[6%]"}>
                            {results.map((user) => <UserCard key={user.id} user={user}/>)}
                    </div> : null }
                {results.length === 0 ? <h2>nothing to see here 😢</h2> : null // todo: make this look pretty
                }
            </div>
        </>
    )
        ;
};

export default UserProfile;
