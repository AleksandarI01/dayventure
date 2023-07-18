import {useState} from "react";
import SignUpFirstStep from "../../components/SignUp/SignUpFirstStep";
import SignUpSecondStep from "../../components/SignUp/SignUpSecondStep";
import SignUpThirdStep from "../../components/SignUp/SignUpThirdStep";
import ProcessBar from "../../components/ProcessBar/ProcessBar.jsx";
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
            <ProcessBar signupStep={signupStep}/>
        </div>
    );
};

export default SignUp;
