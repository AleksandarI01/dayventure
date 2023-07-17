const LoadingSpinner = () => {

    return (
        <>
            <div className={"flex flex-col gap-64"}>
                <div className={"w-full h-[50%]"}>
                </div>
                <div className="w-full flex flex-col justify-center items-center align-middle gap-6">
                    <h2>Loading...</h2>
                    <div className="loading-spinner"></div>
                </div>
            </div>
        </>
    );
};

export default LoadingSpinner;
