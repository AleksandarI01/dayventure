const ProcessBar = ( {signupStep} ) => {

    return (
        <div className="w-full flex flex-row justify-center align-middle items-center">
            <div
                className={"w-8 h-full"}
            >
                <div
                    className={`step-process ${signupStep === 'step1' || signupStep === 'step2' || signupStep === 'step3' ? 'active' : ''}`}>
                    <span className="h-full flex flex-row justify-center align-middle items-center">1</span>
                </div>
            </div>
            <div
                className={`step-process-line ${signupStep === 'step2' || signupStep === 'step3' ? 'active' : ''}`}></div>
            <div
                className={"w-8 h-full"}
            >
                <div className={`step-process ${signupStep === 'step2' || signupStep === 'step3' ? 'active' : ''}`}>
                    <span className="h-full flex flex-row justify-center align-middle items-center">2</span>
                </div>
            </div>
            <div className={`step-process-line ${signupStep === 'step3' ? 'active' : ''}`}></div>
            <div
                className="w-8 h-full"
            >
                <div className={`step-process ${signupStep === 'step3' ? 'active' : ''}`}>
                    <span className="h-full flex flex-row justify-center align-middle items-center">3</span>
                </div>
            </div>
        </div>
    );
};

export default ProcessBar;
