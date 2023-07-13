import Label from "../Label/Label.jsx"

const ProfileDescription = () => {
    const imageUrl = '../../../src/assets/island.png'
    return (
        <div
            className={"w-[800px] h-[250px] flex flex-row shrink-0 border border-solid rounded-md border-venture-gray"}>
            <div className={"h-[100%] w-[25%] flex flex-col shrink-0 border-r border-solid border-venture-gray"}>
                <div
                    className="h-[65%] w-[100%] pt-[2%] shrink-0 flex flex-col gap-[0.2rem] justify-center items-center">
                    <img className={"h-20 w-20 rounded-full"} src={imageUrl} alt={"profile picture"}/>
                    <p className={"pt-[2%]"}>Stefan L.</p>
                    <p>Rome, Italy</p>


                </div>
                <div className={"h-[35%] w-[100%] shrink-0 flex flex-row justify-center items-center"}>
                    <button
                        className={
                            "bg-venture-green rounded-full px-2 py-1 font-medium text-venture-white hover:bg-venture-green-hovered"
                        }
                    >
                        EDIT PROFILE
                    </button>

                </div>

            </div>
            <div className={"h-[100%] w-[75%] flex flex-col shrink-0"}>
                <div className={"h-[60%] w-full flex flex-row shrink-0 border-b border-solid border-venture-gray"}>
                    <div className={"h-full w-[50%] flex flex-col shrink-0 border-r border-solid border-venture-gray"}>
                        <div className={"w-full h-[15]"}>
                            <p className={"text-left p-2"}>About</p>
                        </div>
                        <div className={"w-full h-[85] flex flex-col align-start justify-start"}>
                            <p className={"text-left p-2"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                do eiusmod tempor incid aliqua. Ut enim ad minim veniam, qu</p>
                        </div>
                    </div>
                    <div className={"h-full w-[50%] flex flex-col shrink-0"}>
                        <div className={"w-full h-[15]"}>
                            <p className={"text-left p-2"}>Categories I like</p>
                        </div>
                        <div
                            className={"w-full h-[85] p-1 flex flex-row gap-[0.2rem] align-start justify-start flex-wrap"}>
                            <Label></Label>
                            <Label></Label>
                            <Label></Label>
                            <Label></Label>
                            <Label></Label>
                            <Label></Label>
                            <Label></Label>
                        </div>


                    </div>
                </div>
                <div className={"h-[40%] w-full flex flex-col shrink-0"}>
                    <div className="flex w-full justify-center items-center">
                        <ul className="list-none flex flex-row h-full">
                            <li className="flex h-100 py-5 float-left mx-7 hover:border-b-4 border-1 border-solid border-venture-green">
                                34 <br/>my trips
                            </li>
                            <li className="flex h-100 py-5 float-left mx-7 hover:border-b-4 border-1 border-solid border-venture-green">
                                256 <br/>friends
                            </li>
                            <li className="flex h-100 py-5 float-left mx-7 hover:border-b-4 border-1 border-solid border-venture-green">
                                98 <br/>my friends' trips
                            </li>
                        </ul>
                    </div>


                </div>


            </div>

        </div>


    );
};

export default ProfileDescription;
