import { useState } from "react";
import { RiStarSFill } from "react-icons/ri";

const StarRating = ({ StarRating, totalRatingNumber, ExtraClasses, Input = false, PassRating }) => {
  const [rating, setRating] = useState(StarRating);

  return (
    <div className={`flex flex-row justify-between items-center ${ExtraClasses}`}>
      <div>
        {[...Array(5)].map((item, idx) => {
          const ratingValue = idx + 1;
          return (
            <label key={idx}>
              <input
                type="radio"
                name="rating"
                className={"hidden"}
                value={rating === 0 ? 5 : ratingValue}
                onClick={() => Input ? PassRating(ratingValue): null}
              />
              <RiStarSFill
                className={"text-base"}
                color={
                  StarRating && StarRating >= ratingValue
                    ? "#ffc107"
                    : "#EAEAEA"
                }
              />
            </label>
          );
        })}
      </div>
      <p className={"text-sm"}>{totalRatingNumber}</p>
    </div>
  );
};

export default StarRating;
