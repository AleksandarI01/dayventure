import SearchHeader from "../../components/SearchHeader/SearchHeader";
import Label from "../../components/Label/Label";
import NycMet from "../../assets/images/MetNyc.jpeg";
import { MdShare } from "react-icons/md";
import {useEffect, useState} from "react";
import SwiperContainer from "../../components/SwiperContainer/SwiperContainer";
import {axiosDayVenture} from "../../axios/index.js";

const Home = () => {
  const activeStylePopular =
    "cursor-pointer flex h-100 py-5 float-left mx-7 border-b-4 border-1 border-solid border-venture-green";
  const inactiveStylePopular =
    "underline-effect underline-effect-color cursor-pointer flex h-100 py-5 float-left mx-7";
  const [sightseeingClicked, setSightseeingClicked] = useState(true);
  const [culinaryClicked, setCulinaryClicked] = useState(false);
  const [shoppingClicked, setShoppingClicked] = useState(false);
  const [nightlifeClicked, setNightlifeClicked] = useState(false);
  const [adventureClicked, setAdventureClicked] = useState(false);

  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)


  useEffect(() => {
    axiosDayVenture
        .get("/categories/")
        .then((res) => {
          const cats = res.data.sort((catA, catB) => catB.trip_count - catA.trip_count)
          setCategories(cats);
          setSelectedCategory(cats[0].name)
          console.log(cats)
        })
        .catch((error) => {
          console.log(error);
        })
  }, [])

  const clickSearchCategory = (e) => {
    console.log(e.target.id)
    }

  const handlePopularClick = (event) => {
    event.preventDefault();
    if (event.target.id === "popular-sightseeing") {
      setSightseeingClicked(true);
      setCulinaryClicked(false);
      setShoppingClicked(false);
      setNightlifeClicked(false);
      setAdventureClicked(false);
    } else if (event.target.id === "popular-culinary") {
      setSightseeingClicked(false);
      setCulinaryClicked(true);
      setShoppingClicked(false);
      setNightlifeClicked(false);
      setAdventureClicked(false);
    } else if (event.target.id === "popular-shopping") {
      setSightseeingClicked(false);
      setCulinaryClicked(false);
      setShoppingClicked(true);
      setNightlifeClicked(false);
      setAdventureClicked(false);
    } else if (event.target.id === "popular-nightlife") {
      setSightseeingClicked(false);
      setCulinaryClicked(false);
      setShoppingClicked(false);
      setNightlifeClicked(true);
      setAdventureClicked(false);
    } else {
      setSightseeingClicked(false);
      setCulinaryClicked(false);
      setShoppingClicked(false);
      setNightlifeClicked(false);
      setAdventureClicked(true);
    }
  };

  return (
    <>
      <div className="flex flex-col align-middle justify-center w-full items-center bg-KayakHomeHeader h-96 bg-no-repeat bg-cover">
        <h1 className="flex text-venture-white my-6">
          ORGANIZE YOUR PERFECT DAY-TRIP
        </h1>
        <SearchHeader />
        <div className="flex flex-row py-3">
          {categories.sort((catA, catB) => catB.liked_count - catA.liked_count)
              .slice(0,7).map((cat) => <Label key={cat.id}
                                              onClickFunction={clickSearchCategory}>
                {cat.name}</Label>)
          }
        </div>
      </div>
      <div className="flex flex-row w-full justify-center ">
        <div className="flex flex-col w-8/12 align-center">
          <div className="flex w-full  py-10">
            <h2>Popular dayventures</h2>
          </div>
          <div className="flex w-full justify-start">
            <ul className="list-none flex flex-row h-full">
              {categories.slice(0,5).map((cat) => {
                (<li
                    key={cat.id}
                    id={cat.name}
                    className={cat.name === selectedCategory ? activeStylePopular : inactiveStylePopular}
                    onClick={handlePopularClick}
                >
                  {cat.name}
                </li>)
              })}
            </ul>
          </div>

          <div className="flex flex-row w-full p-8">
            {sightseeingClicked ? (
              <SwiperContainer />
            ) : culinaryClicked ? (
              <SwiperContainer />
            ) : shoppingClicked ? (
              <SwiperContainer />
            ) : nightlifeClicked ? (
              <SwiperContainer />
            ) : adventureClicked ? (
              <SwiperContainer />
            ) : null}
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
