import Label from "../Label/Label.jsx";
import StarRatings from "react-star-ratings";
import { useState,useEffect } from "react";
import {axiosDayVenture} from "../../axios/index.js";
import Data from "../../assets/island.png";
import {useNavigate} from "react-router-dom";
import { motion } from "framer-motion"

//todo: make it look nice with all the data...
const Trip = ({ trip }) => {
    const [rating, setRating] = useState(0);
    const navigate = useNavigate();

    const fadeInVariants = {
        hidden: {opacity: 0},
        visible: {opacity: 1},
    }

    // Fetch rating when the component mounts
    useEffect(() => {
        axiosDayVenture.get(`/api/trips/${trip.id}/rating/`) // replace with the actual endpoint
            .then((res) => {
                setRating(res.data.rating);
            })
            .catch((error) => {
                console.error(error);
            })
    }, [trip.id]); // Pass `trip.id` as a dependency so that the effect runs again if `trip.id` changes

    const changeRating = (newRating) => {
        // Update the state immediately
        setRating(newRating);

        // Send the updated rating to the server
        axiosDayVenture.put(`/api/trips/${trip.id}/rating/`, {rating: newRating}) // replace with the actual endpoint
            .then((res) => {
                // If the server sends back the final rating, update it
                if (res.data.rating !== undefined) {
                    setRating(res.data.rating);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };


    return (
        <>
            <motion.div onClick={() => navigate(`/trip/${trip.id}`)}
                        className="card-height-width shrink-0 flex flex-col gap-[0.2rem] border border-solid rounded-md border-venture-gray"
                        initial="hidden"
                        whileInView="visible" viewport={{once: true}}
                        variants={fadeInVariants}
                        transition={{duration: 1.3}}>
                <div className="h-[70%] w-[100%] rounded-md bg-cover"
                     style={{backgroundImage: `url(${trip.trip_image || trip.map_image || Data})`}}></div>
                <div className="h-[30%] w-[100%]">
                    <div className="h-[40%] w-[100%] shrink-0 flex flex-row gap-[0.2rem]">
                        <div className="h-[100%] w-[50%] flex flex-col ">
                            <div className="h-[50%] w-[100%]">
                                <p className="text-left pl-2 pt-2 font-bold text-xs">{trip?.name}</p>
                            </div>
                            <div className="h-[50%] w-[100%] flex flex-col justify-start items-start">
                                <p className="text-left pl-2 font-medium text-xs text-venture-darkgray">
                                    Location: {trip?.location}
                                </p>
                            </div>
                        </div>
                        <div
                            className="h-full w-1/2 border border-solid border-orange flex items-center justify-center">
                            <StarRatings
                                rating={rating}
                                starHoverColor="#06C9A2" // venture-green-hovered
                                starRatedColor="#00A987" // venture-green
                                changeRating={changeRating}
                                numberOfStars={5}
                                name="rating"
                                starDimension="20px"
                                starSpacing="2px"
                                starEmptyColor="#EBEBEB" // venture-gray
                                starSelectingHoverColor="#FF3700" // venture-red-hovered
                            />
                        </div>
                    </div>
                    <div className="h-[60%] w-[100%] flex flex-col shrink-0">
                        <div className="h-[35%] w-[100%]">
                            <p className="text-left pl-2 font-medium text-xs text-venture-darkgray">
                                created by: {trip?.owner.username} 4 lv
                            </p>
                        </div>
                        <div
                            className="h-[65%] w-[100%] pl-1 flex flex-row shrink-0 justify-center items-center gap-[0.2rem] flex-wrap">
                            {trip?.categories?.map((cat) => (
                                <Label key={cat.id}>{cat.name}</Label>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

export default Trip;
