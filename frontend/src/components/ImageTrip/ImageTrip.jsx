import Button from "../Button/Button.jsx";
import { MdLocationPin } from "react-icons/md";
import Data from "../../assets/island.png"; // this will be a different path when we have the backend (prop)

const ImageTrip = ({trip}) => {
    return (
        <>
            <div
                className="card-height-width border border-solid rounded-md border-venture-gray">
                <div className="h-[100%] w-[100% ] shrink-0 flex flex-col border border-solid rounded-md bg-cover"
                    style={{backgroundImage: `url(${trip.trip_image || trip.map_image || Data})`}}>
                    <div className="h-[3%] w-[100% ]"></div>
                    <div className="h-[25%] w-[100%] shrink-0 flex flex-row">
                        <div className="h-[100%] w-[50%] shrink-0 flex justify-start items-start pt-2 pl-3">
                            <div className="h-6 w-6 z-40 shrink-0 flex justify-center items-center rounded-full bg-venture-white">
                                <MdLocationPin/>
                            </div>
                        </div>
                        <div className="h-[100%] w-[50%] shrink-0 flex flex-col">
                            <div className="h-[50%] w-[100%]">
                               <p>{trip.location}</p>
                            </div>
                            <div className="h-[50%] w-[100%]"></div>

                        </div>

                    </div>
                    <div className="h-[52%] w-[100%] shrink-0 flex flex-col">
                    </div>
                    <div className="h-[20%] w-[100%] shrink-0 flex flex-row justify-center items-center">

                        <Button>DISCOVER</Button>
                    </div>


                </div>
            </div>


        </>


    );
};

export default ImageTrip;
