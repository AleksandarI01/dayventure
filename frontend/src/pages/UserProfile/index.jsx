import Trip from "../../components/Trip/Trip.jsx"
import UserCard from "../../components/UserCard/UserCard.jsx"
import Modal from 'react-modal';
import ProfileDescription from "../../components/ProfileDescription/ProfileDescription.jsx";
import ProfileEditModal from '../../components/ProfileEditModal/ProfileEditModal';
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {axiosDayVenture} from "../../axios/index.js";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner.jsx";
import {useParams} from "react-router-dom";

const UserProfile = () => {
    const defaultImage = '../../../src/assets/island.png'
    const accessToken = useSelector((state) => state.user.accessToken);
    const loggedInUserId = useSelector((state) => state.user.id);

    const { userId } = useParams();

    const [isActiveUser, setIsActiveUser] = useState(false)
    const [selectedView, setSelectedView] = useState('myTrips')
    const [results, setResults] = useState([])
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [imageBanner, setImageBanner] = useState(null)
    const [imageBannerShow, setImageBannerShow] = useState(user.banner)

    useEffect(() => {
        let config = null
        if (accessToken) {
            config = {headers: {Authorization: `Bearer ${accessToken}`}};
        }
        let url = '/users/'
        if (loggedInUserId && (!userId || parseInt(userId) === loggedInUserId)) {
            url += 'me/'
            setIsActiveUser(true)
        } else if (userId) {
            url += `${userId}/`
            setIsActiveUser(false)
        } else {
            return
        }
        axiosDayVenture
            .get(url, config)
            .then((res) => {
                setUser(res.data);
                console.log(res.data)
                setImageBannerShow(res.data.banner);
            })
            .catch((error) => {
                console.log(error);
            })

    }, [accessToken, loggedInUserId, userId])

    useEffect(() => {
        setLoading(true)
        let url = '/trips/'
        switch (selectedView) {
            case 'myTrips':
                if (isActiveUser) {
                    url = '/trips/my/';
                } else if (userId) {
                    url = `/trips/owner/${userId}/`
                } else {
                    return
                }
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

    }, [accessToken, isActiveUser, selectedView, userId])


    const onEditProfileClick = () => {
        setIsModalOpen(true);
      };

      useEffect(() => {
    axiosDayVenture
      .get("/categories/")
      .then((res) => {
        setCategories(
          res.data.sort((catA, catB) => catB.like_count - catA.like_count)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

    return (
        <>
            <div className={"w-full flex flex-col shrink-0 gap-6"}>
                <div className={"bg-red-400 w-full h-48 bg-no-repeat bg-cover"}>
                    <img className={"w-full h-full bg-no-repeat bg-cover"} src={imageBannerShow ? imageBannerShow : defaultImage } alt="user banner picture"/>
                </div>
                <div className={"w-full flex shrink-0 justify-center items-center"}>
                    <ProfileDescription user={user} setSelectedView={setSelectedView} setResults={setResults} setImageBanner={setImageBanner} imageBanner={imageBanner} imageBannerShow={imageBannerShow} setImageBannerShow={setImageBannerShow} isActiveUser={isActiveUser}/>
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
            {isModalOpen && <ProfileEditModal ShowsetResults={setResults} setIsModalOpen={setIsModalOpen} />}
        </>
    )
        ;
};

export default UserProfile;
