import SearchHeader from "../../components/SearchHeader/SearchHeader.jsx";
import Label from "../../components/Label/Label.jsx";
import UserCard from "../../components/UserCard/UserCard.jsx";
import Trip from "../../components/Trip/Trip.jsx";
import {useEffect, useState} from "react";
import {axiosDayVenture} from "../../axios/index.js";
import {useSelector} from "react-redux";
import config from "tailwindcss/defaultConfig.js";


const Search = () => {
    const activeStyleSearch = "cursor-pointer flex h-100 py-5 float-left mx-7 border-b-4 border-1 border-solid border-venture-green"
    const inactiveStyleSearch = "underline-effect underline-effect-color cursor-pointer flex h-100 py-5 float-left mx-7"

    const accessToken = useSelector((state) => state.user.accessToken);

    const [searchType, setSearchType] = useState('trips')
    const [styleUsers, setStyleUsers] = useState(inactiveStyleSearch)
    const [styleTrips, setStyleTrips] = useState(activeStyleSearch)
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [searchString, setSearchString] = useState('')
    const [results, setResults] = useState([])

    useEffect(() => {
        axiosDayVenture
            .get("/categories/")
            .then((res) => {
                setCategories(res.data.sort((catA, catB) => catB.like_count - catA.like_count));
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const clickCategory = (e) => {
        if (selectedCategory === e.target.id) {
            setSelectedCategory(null)
        } else {
            setSelectedCategory(e.target.id)
        }
    }

    const handleTypeClick = (e) => {
        e.preventDefault();
        setResults([])
        if (e.target.id === "users") {
            setSearchType('users');
            setStyleUsers(activeStyleSearch);
            setStyleTrips(inactiveStyleSearch);
            setSelectedCategory(null);
        } else {
            setSearchType('trips');
            setStyleUsers(inactiveStyleSearch);
            setStyleTrips(activeStyleSearch);
        }
    }

    const fetchSearchResults = () => {
        let config = null
        if (accessToken) {
            config = {headers: {Authorization: `Bearer ${accessToken}`}};
        }
        let url = `/search/?type=${searchType}`
        if (searchString) url += `&search_string=${searchString}`
        if (selectedCategory) url += `&category=${selectedCategory}`
        axiosDayVenture
            .get(url, config)
            .then((res) => {
                console.log(res.data);
                setResults(res.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchSearchResults();
    }

        useEffect(fetchSearchResults, [searchType])


    return (
        <>
            <div className={"flex flex-col justify-center align-middle"}>
                <div
                    className="flex flex-col align-middle justify-center w-full items-center bg-KayakHomeHeader h-96 bg-no-repeat bg-cover">
                    <div className={"w-full h-[23%]"}>
                    </div>

                    <SearchHeader value={searchString} onChangeFunction={e => setSearchString(e.target.value)} onSubmitFunction={handleSubmit}/>
                    <div className="flex flex-row py-3">
                        {searchType === 'trips' ?
                            categories.map((cat) => <Label key={cat.id}
                                                           onClickFunction={clickCategory}
                                                           active={cat.name === selectedCategory}>
                                {cat.name}</Label>)
                            : null }
                    </div>
                </div>
                <div className="flex w-full justify-center pt-[1%]">
                    <ul className="list-none flex flex-row h-full">
                        <li id={"trips"} onClick={handleTypeClick}
                            className={styleTrips}>
                            Trips
                        </li>
                        <li id={"users"} onClick={handleTypeClick}
                            className={styleUsers}>
                            Users
                        </li>
                    </ul>
                </div>
                <div className={"w-full flex justify-center align-middle pb-[12%] pt-[2%]"}>
                    {searchType === 'users' ?
                        <div className={"w-[80%] grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-[2.4rem]"}>
                            {results.map((user) => <UserCard key={user.id} user={user}/>)}
                        </div> :
                        <div className={"w-[80%] grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-[2.4rem]"}>
                            {results.map((trip) => <Trip key={trip.id} trip={trip}/>)}
                        </div>}
                    {results.length === 0 ? <h2>no results for this search</h2> : null // todo: make this look pretty
                        }
                </div>
            </div>

        </>
    )
        ;
};

export default Search;
