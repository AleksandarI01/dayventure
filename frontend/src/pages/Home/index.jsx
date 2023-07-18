import SearchHeader from "../../components/SearchHeader/SearchHeader";
import Label from "../../components/Label/Label";
import NycMet from "../../assets/images/MetNyc.jpeg";
import { MdShare } from "react-icons/md";
import {useEffect, useState} from "react";
import SwiperContainer from "../../components/SwiperContainer/SwiperContainer";
import {axiosDayVenture} from "../../axios/index.js";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const Home = () => {
  const activeStylePopular = "cursor-pointer flex h-100 py-5 float-left mx-7 border-b-4 border-1 border-solid border-venture-green";
  const inactiveStylePopular = "underline-effect underline-effect-color cursor-pointer flex h-100 py-5 float-left mx-7";

  const accessToken = useSelector((state) => state.user.accessToken);

  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [trips, setTrips] = useState([])
  const [searchString, setSearchString] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    axiosDayVenture
        .get("/categories/")
        .then((res) => {
          const cats = res.data.sort((catA, catB) => catB.trip_count - catA.trip_count)
          setCategories(cats);
          setSelectedCategory(cats[0].name)
        })
        .catch((error) => {
          console.log(error);
        })
  }, [])

  useEffect(() => {
    let config = null
    if (accessToken) {
      config = {headers: {Authorization: `Bearer ${accessToken}`}};
    }
    let url = selectedCategory ? `/home/?category=${selectedCategory}` : '/home/'
    axiosDayVenture
        .get(url, config)
        .then((res) => {
          setTrips(res.data)
        })
            .catch((error) => {
                console.log(error);
            })

  }, [accessToken, selectedCategory])

  const clickSearchCategory = (e) => {
    console.log(e.target.id)
    let link = '/search/'
    e.target.id === '. . .' ? link += '?' : link += `?category=${e.target.id}&`;
    searchString ? link += `search_string=${searchString}` : null;
    navigate(link)
  }

  const enterSearch = (e) => {
    e.preventDefault()
    console.log('go to search...')
    navigate(searchString ? `/search/?search_string=${searchString}` : '/search/')
  }


  const handlePopularClick = (e) => {
    e.preventDefault();
    setSelectedCategory(e.target.id)
  };

  return (
    <>
      <div className="flex flex-col align-middle justify-center w-full items-center bg-KayakHomeHeader h-96 bg-no-repeat bg-cover">
        <h1 className="flex text-venture-white my-6">
          ORGANIZE YOUR PERFECT DAY-TRIP
        </h1>
        <SearchHeader onSubmitFunction={enterSearch} value={searchString} onChangeFunction={(e) => setSearchString(e.target.value)} />
        <div className="flex flex-row py-3">
          {categories.sort((catA, catB) => catB.liked_count - catA.liked_count)
              .slice(0,6).map((cat) => <Label key={cat.id}
                                              onClickFunction={clickSearchCategory}
                                              clickable={true}>
                {cat.name}</Label>)
          }
          <Label onClickFunction={clickSearchCategory}>. . .</Label>
        </div>
      </div>
      <div className="flex flex-row w-full justify-center ">
        <div className="flex flex-col w-8/12 align-center">
          <div className="flex w-full  py-10">
            <h2>Popular dayventures</h2>
          </div>
          <div className="flex w-full justify-start">
            <ul className="list-none flex flex-row h-full">
              {categories.sort((catA, catB) => catB.trip_count - catA.trip_count)
                  .slice(0,5).map((cat) =>
                      <li
                          key={cat.id}
                          id={cat.name}
                          className={cat.name === selectedCategory ? activeStylePopular : inactiveStylePopular}
                          onClick={handlePopularClick}
                      >
                        {cat.name}
                      </li>
                  )}
            </ul>
          </div>

          <div className="flex flex-row w-full p-8">
              <SwiperContainer trips={trips}/>
          </div>

          <div className="flex flex-row w-full p-8">
            <div className="flex flex-col w-1/3 items-center">
              <MdShare className="text-4xl my-3" />
              <h4>Easy Itinerary Planning</h4>
            </div>
            <div className="flex flex-col w-1/3 items-center">
              <MdShare className="text-4xl my-3" />
              <h4>Invite Your Friends</h4>
            </div>
            <div className="flex flex-col w-1/3 items-center">
              <MdShare className="text-4xl my-3" />
              <h4 className="m-2">Estimate Trip Expenses</h4>
            </div>
          </div>
          <div className="flex flex-row w-full bg-gradient-to-b from-venture-white to-venture-green">
            <div className="flex flex-col w-1/2">
              <img src={NycMet} />
            </div>
            <div className="flex flex-col justify-center w-1/2">
              <div className="py-4">
                <h3>How it works</h3>
                <p className="p-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                  in malesuada lacus. Cras non pulvinar ex, a posuere leo.
                </p>
                <p className="p-4">
                  Sed congue erat vel arcu dignissim gravida. Pellentesque sit
                  amet est urna.
                </p>
                <p className="p-4">
                  Sed tempus tempor lacus eu volutpat. Donec fermentum maximus
                  eros, sed placerat nulla congue id.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
