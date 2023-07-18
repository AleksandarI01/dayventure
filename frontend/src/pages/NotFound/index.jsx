import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Button from "../../components/Button/Button";
import NotFoundImage from "../../assets/images/404.png";

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Save the previous location when the current location changes
  useEffect(() => {
    localStorage.setItem("prevLocation", location.pathname);
  }, [location]);

  const handleOnClick = (e) => {
    e.preventDefault();
    // If there's a previous location, navigate to it
    let prevLocation = localStorage.getItem("prevLocation");
    console.log("PrevLocation: ", prevLocation);
    if (prevLocation) {
      navigate(prevLocation);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <div className="h-[87.5vh] flex flex-col justify-center items-center gap-12">
        <h1>Error 404</h1>
        <p>
          You must have taken a wrong turn.
          <br />
          Let us bring you back on track!
        </p>
        <img
          src={NotFoundImage}
          alt="NotFoundImage"
          className="h-[16vh] w-[16vh]"
        ></img>
        <Button onClickFunction={handleOnClick}>Go Back</Button>
      </div>
    </>
  );
};

export default NotFound;
