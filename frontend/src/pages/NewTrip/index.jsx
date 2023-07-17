import React from 'react';
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import {MdOutlineKeyboardArrowDown} from "react-icons/md";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {add_trip} from "../../store/slices/newTrip";
//import TripHeader from "../../components/TripHeader/TripHeader";
//import GoogleMapReact from "google-map-react";
//import { Autocomplete } from "@react-google-maps/api";

const NewTrip = () => {
    const [newTrip, setNewTrip] = useState({})
    const [newTripTest, setNewTripTest] = useState({})
    const dispatch = useDispatch()
    const selectedItems = useSelector((state) => console.log(state.newTrip, "USESELECT"))
    // state.newTrip.items
    //const coordinates = { lat: 46.807405, lng: 8.223595 };

    const handleAddTrip = (e) => {
        e.preventDefault()
        if (newTrip.trim()) {
            dispatch(
                add_trip({
                    tripName: newTrip,
                    startTime: newTripTest,
                })
            );
        }
    }

    const handleInput = (e) => {
        // console.log(e)
        setNewTrip(e)

    }
        const handleInputTest = (e) => {
        // console.log(e)

        setNewTripTest(e)
    }


    return (
        <>
            <div className="flex flex-col items-center w-full ">
                <div className="w-full h-80">
                    {/*<GoogleMapReact*/}
                    {/*  bootstrapURLKeys={{*/}
                    {/*    key: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY,*/}
                    {/*  }}*/}
                    {/*  defaultCenter={coordinates}*/}
                    {/*  center={coordinates}*/}
                    {/*  defaultZoom={7}*/}
                    {/*  margin={[50, 50, 50, 50]}*/}
                    {/*  options={''}*/}
                    {/*  onChange={''}*/}
                    {/*  onChildClick={''}*/}
                    {/*></GoogleMapReact>*/}
                </div>
                <div className="flex flex-row w-4/12 justify-center py-8 border-b-2 border-venture-green">
                    <h2>CREATE A NEW DAYVENTURE</h2>
                </div>
                <div className="flex flex-row w-6/12 justify-center py-8 ">
                    <div className="flex flex-row w-full justify-start h-8 rounded-full bg-venture-green">
                        <div className="flex flex-col">
                            <MdOutlineKeyboardArrowDown className="text-5xl text-venture-white"/>
                        </div>
                        <h5 className="flex flex-row items-center text-venture-white font-extrabold">
                            CHOOSE A DAYVENTURENAME
                        </h5>
                    </div>
                </div>
                <div className="flex flex-row w-6/12 justify-center py-8">
                    <form className="flex flex-col justify-center w-full gap-5" onSubmit={handleAddTrip}>
                        <div className="flex flex-row justify-center gap-5 ">
                            <InputField
                                type={"text"}
                                value={newTrip}
                                onChange={handleInput}
                                id={"tripName"}
                                className="flex flex-row w-full "
                                placeholder={"Write the name of your trip"}
                            />
                            <InputField
                                type={"text"}
                                value={newTrip}
                                onChange={handleInputTest}
                                className="flex flex-row w-full "
                                placeholder={"START TIME"}
                            />
                            <Button type={"submit"}>CONFIRM</Button>
                        </div>
                    </form>

                </div>
                <div className="flex flex-row w-6/12 justify-center py-8">
                    <form className="flex flex-col justify-center w-full gap-5" onSubmit={handleAddTrip}>
                        <div className="flex flex-row justify-center gap-5 ">
                            <InputField
                                type={"text"}
                                className="flex flex-row w-full "
                                placeholder={"How long you want to stay there?"}
                            />
                            <Button type={"submit"}>CONFIRM</Button>
                        </div>
                    </form>

                </div>
                <div className="flex flex-row w-6/12 justify-center py-8 b">
                    <div className="flex flex-row w-full justify-start h-8 rounded-full bg-venture-green">
                        <div className="flex flex-col">
                            <MdOutlineKeyboardArrowDown className="text-5xl text-venture-white"/>
                        </div>
                        <h5 className="flex flex-row items-center text-venture-white font-extrabold">
                            CHOOSE A DAY
                        </h5>
                    </div>
                </div>
                <form className="flex flex-col justify-center w-full py-8 gap-5">
                    <div className="flex flex-row justify-center gap-5 ">
                        <InputField
                            type="date"
                            className="flex flex-row w-full "
                            placeholder={"How long you want to stay there?"}
                        />
                        <Button>CONFIRM</Button>
                    </div>
                </form>
                <div className="flex flex-row w-6/12 justify-center py-8">
                    <div className="flex flex-row w-full justify-start h-8 rounded-full bg-venture-green">
                        <div className="flex flex-col">
                            <MdOutlineKeyboardArrowDown className="text-5xl text-venture-white"/>
                        </div>
                        <h5 className="flex flex-row items-center text-venture-white font-extrabold">
                            PICK A STARTING LOCATION
                        </h5>
                    </div>
                </div>
                <form className="flex flex-col justify-center w-full py-8 gap-5">
                    <div className="flex flex-row justify-center gap-5">
                        <InputField
                            className="flex flex-row w-full"
                            placeholder={"Where do you want to go?"}
                        />
                        <Button>SEARCH</Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default NewTrip;
