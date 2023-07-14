import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import NotFoundImage from "../../assets/images/404.png";
const NotFound = () => {
  const navigate = useNavigate();

  const handleOnClick = (e) => {
    e.preventDefault();
    // add your signup logic here
    navigate("/");
  };
  return (
    <>
      <div className="h-[87.5vh] flex flex-col justify-center items-center gap-5">
        <h1>Error 404</h1>
        <p>You must have taken a wrong turn.<br />Let us bring you back on track!</p>
        <img src={NotFoundImage} alt="NotFoundImage" className="h-[16vh] w-[16vh]"></img>
        <Button onClickFunction={(e) => handleOnClick(e)}>Go Back</Button>
      </div>
    </>
  );
};

export default NotFound;

