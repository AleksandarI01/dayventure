import Label from "../Label/Label.jsx"


const UserCard = () => {
    const imageUrl = '../../../src/assets/island.png'
    return (
        <>
            <div
                className="card-height-width shrink-0 flex flex-col gap-[0.2rem] border border-solid rounded-md border-venture-gray">
                <div className="h-[55%] w-[100%]">
                    <div
                        className="h-[67%] w-[100%] shrink-0 flex flex-col justify-center items-center">
                        <img className={"h-20 w-20 rounded-full"} src={imageUrl} alt={"profile picture"}/>
                        <p>Stefan L.</p>
                        <p>Rome, Italy</p>


                    </div>

                    <div
                        className="h-[33%] w-[100%] shrink-0 flex flex-row gap-[0.2rem] justify-center items-center">
                        <button
                            className={
                                "bg-venture-green rounded-full px-2 py-1 font-medium text-venture-white hover:bg-venture-green-hovered"
                            }
                        >
                            Following
                        </button>
                        <button
                            className={
                                "bg-venture-green rounded-full px-5 py-1 font-medium text-venture-white hover:bg-venture-green-hovered"
                            }
                        >
                            Friend
                        </button>

                    </div>

                </div>
                <div className="h-[45%] w-[100%]">
                    <div className={"h-[68%] w-[100%]"}>
                        <p>Lorem ipsum dolor sit amet, vim ut quas volumus probatus, has tantas laudem iracundia et, ad per utamur ceteros apeirian</p>
                    </div>
                    <div className={"h-[30%] w-[100%] pb-[2%] flex flex-row shrink-0 gap-[0.2rem] justify-center items-center flex-wrap"}>
                        <Label>SightSeeing</Label>
                        <Label>Food</Label>
                        <Label>Museums</Label>
                    </div>



                </div>


            </div>

        </>
    );
};

export default UserCard;
