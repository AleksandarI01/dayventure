import {useState} from "react";
import SignUpFirstStep from "../../components/SignUp/SignUpFirstStep";
import SignUpSecondStep from "../../components/SignUp/SignUpSecondStep";
import SignUpThirdStep from "../../components/SignUp/SignUpThirdStep";
import {useNavigate} from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    const [signupStep, setSignupStep] = useState("step1");
    const [email, setEmail] = useState("");

    const moveToNextStep = () => {
        if (signupStep === "step1") {
            setSignupStep("step2");
        } else if (signupStep === "step2") {
            setSignupStep("step3");
        }
    };

    return (
        <div className="h-[87.5vh] flex flex-col justify-center items-center gap-12">
            {signupStep === "step1" && (
                <SignUpFirstStep setEmail={setEmail} moveToNextStep={moveToNextStep}/>
            )}
            {signupStep === "step2" && (
                <SignUpSecondStep email={email} moveToNextStep={moveToNextStep}/>
            )}
            {signupStep === "step3" && <SignUpThirdStep email={email}/>}
            {signupStep === "step1" && (
                <p>
                    Already have an account?
                    <strong className="cursor-pointer" onClick={() => navigate("/login")}>
                        {" "}
                        <u> Login! </u>
                    </strong>
                </p>
            )}
            <div className="w-full flex flex-row justify-center align-middle items-center">
                <div
                    className={"w-8 h-full"}
                >
                    <div className={`step-process ${signupStep === 'step1' || signupStep === 'step2' || signupStep === 'step3' ? 'active' : ''}`}>
                        <span className="h-full flex flex-row justify-center align-middle items-center">1</span>
                    </div>
                </div>
                <div className={`step-process-line ${signupStep === 'step2' || signupStep === 'step3' ? 'active' : ''}`}></div>
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
        </div>
    );
};

export default SignUp;
