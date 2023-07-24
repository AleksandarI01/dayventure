import React, {useState, useEffect} from 'react';
import StarRatings from 'react-star-ratings';
import {axiosDayVenture} from '../../axios/index.js';

const RatingStar = ({tripId}) => {
    const [rating, setRating] = useState(0);

    // Fetch rating when the component mounts
    useEffect(() => {
        axiosDayVenture.get(`/api/trips/${tripId}/rating/`) // replace with the actual endpoint
            .then((res) => {
                setRating(res.data.rating);
            })
            .catch((error) => {
                console.error(error);
            })
    }, [tripId]); // Pass `tripId` as a dependency so that the effect runs again if `tripId` changes

    const changeRating = (newRating) => {
        // Update the state immediately
        setRating(newRating);

        // Send the updated rating to the server
        axiosDayVenture.put(`/api/trips/${tripId}/rating/`, {rating: newRating}) // replace with the actual endpoint
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
    );
}

export default RatingStar;
