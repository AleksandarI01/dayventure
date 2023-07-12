import Button from "../Button/Button.jsx"
import {MdLocationPin} from "react-icons/md";
import Data from '../../assets/island.png'; // this will be a different path when we have the backend (prop)

const ImageTrip = () => {
    return (
        <>
            <div
                className="w-[272px] h-[400px] border border-solid rounded-md border-venture-gray">
                <div className="h-[100%] w-[100% ] shrink-0 flex flex-col border border-solid rounded-md bg-cover"
                    style={{backgroundImage: `url(${Data})`}}>
                    <div className="h-[3%] w-[100% ]"></div>
                    <div className="h-[25%] w-[100%] shrink-0 flex flex-row">
                        <div className="h-[100%] w-[50%] shrink-0 flex justify-start items-start pt-2 pl-2">
                            <div className="h-5 w-5 z-40 shrink-0 flex justify-center items-center rounded-full bg-venture-white">
                                <MdLocationPin></MdLocationPin>
                            </div>
                        </div>
                        <div className="h-[100%] w-[50%] shrink-0 flex flex-col">
                            <div className="h-[50%] w-[100%]">
                               <p>Capri Italy</p>
                            </div>
                            <div className="h-[50%] w-[100%]"></div>

                        </div>

                    </div>
                    <div className="h-[52%] w-[100%] shrink-0 flex flex-col">
                    </div>
                    <div className="h-[20%] w-[100%] shrink-0 flex flex-row justify-center items-center">

                        <Button></Button>
                    </div>


                </div>
            </div>


        </>


    );
};

export default ImageTrip;
