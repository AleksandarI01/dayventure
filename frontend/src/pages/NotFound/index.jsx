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

  const handleOnClick = () => {
    navigate(-1);
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
        <div className={"flex flex-row gap-[2rem] justify-center"}>
          <Button onClickFunction={handleOnClick}>Go Back</Button>
          <Button onClickFunction={() => navigate("/")}>Home</Button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
