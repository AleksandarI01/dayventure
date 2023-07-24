import {useState} from 'react';
import StarRatings from 'react-star-ratings';
import {axiosDayVenture} from '../../axios/index.js';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const RatingStar = ({tripId, rating: ratingSup, edit  =true, size = 1}) => {
    const accessToken = useSelector((state) => state.user.accessToken);
    const navigate = useNavigate()
    const [rating, setRating] = useState(ratingSup);

    const changeRating = (newRating) => {
        if (accessToken) {
            if (edit) {
                const config = {headers: {Authorization: `Bearer ${accessToken}`}};
                axiosDayVenture.post(`/trips/review/${tripId}/`, {rating: newRating}, config)
                    .then(() => {
                        setRating(newRating)
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        } else {
            navigate('/login')
        }
    };

    return (
        <StarRatings
            rating={rating}
            starHoverColor="#06C9A2" // venture-green-hovered
            starRatedColor="#00A987" // venture-green
            changeRating={changeRating}
            numberOfStars={5}
            name="rating"
            starDimension={`${20 * size}px`}
            starSpacing={`${2 * size}px`}
            starEmptyColor="#EBEBEB" // venture-gray
            starSelectingHoverColor="#FF3700" // venture-red-hovered
        />
    );
}

export default RatingStar;
