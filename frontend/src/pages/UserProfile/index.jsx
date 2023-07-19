import Trip from "../../components/Trip/Trip.jsx"
import UserCard from "../../components/UserCard/UserCard.jsx"
import Modal from 'react-modal';
import ProfileDescription from "../../components/ProfileDescription/ProfileDescription.jsx";
import ProfileEditModal from '../../components/ProfileEditModal/ProfileEditModal';
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {axiosDayVenture} from "../../axios/index.js";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.jsx";

const UserProfile = () => {
    const defaultImage = '../../../src/assets/island.png'
    const accessToken = useSelector((state) => state.user.accessToken);

    const [selectedView, setSelectedView] = useState('myTrips')
    const [results, setResults] = useState([])
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setLoading(true)
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
                setResults(res.data)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error);
            })

    }, [accessToken, selectedView])

    useEffect(() => {
        let url = '/users/me/'
        const config = {headers: {Authorization: `Bearer ${accessToken}`}};
        axiosDayVenture
            .get(url, config)
            .then((res) => {
                setUser(res.data);
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            })

    }, [accessToken, selectedView])

    const onEditProfileClick = () => {
        setIsModalOpen(true);
      };


//todo: styling of banner picture
    return (
        <>
            <div className={"w-full flex flex-col shrink-0 gap-6"}>
                <div className={"bg-red-400 w-full h-48 bg-no-repeat bg-cover"}>
                    <img className={"w-full h-full bg-no-repeat bg-cover"} src={user?.banner ? user.banner : defaultImage } alt="user banner picture"/>
                </div>
                <div className={"w-full flex shrink-0 justify-center items-center"}>
                    <ProfileDescription user={user} setSelectedView={setSelectedView} setResults={setResults}/>
                </div>
                {selectedView === 'myTrips' || selectedView === 'friendsTrips' ?
                    <div className={"w-full flex shrink-0 justify-center items-center mb-[6%]"}>
                            {results.map((trip) => <Trip key={trip.id} trip={trip}/>)}
                    </div> : null }
                {selectedView === 'friends' ?
                    <div className={"w-full flex shrink-0 justify-center items-center mb-[6%]"}>
                            {results.map((user) => <UserCard key={user.id} user={user}/>)}
                    </div> : null }
                {results.length === 0 ?
                    loading ? <div className={"h-[2rem] w-[100%] flex flex-row justify-center align-middle items-end"}><LoadingSpinner/></div>
                        : <div className={"h-[12rem] flex flex-row justify-center align-middle items-start"}><h2>nothing to see here 😢</h2></div> : null // todo: make this look pretty
                }
            </div>
            {isModalOpen && <ProfileEditModal setIsModalOpen={setIsModalOpen} />}
        </>
    )
        ;
};

export default UserProfile;
