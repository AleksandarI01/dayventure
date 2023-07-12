import React, { useState } from "react";
import SignUpFirstStep from "../../components/SignUp/SignUpFirstStep";
import SignUpSecondStep from "../../components/SignUp/SignUpSecondStep";
import SignUpThirdStep from "../../components/SignUp/SignUpThirdStep";
const SignUp = () => {
  const [signupStep, setSignupStep] = useState('step1');
  const [email, setEmail] = useState('');

  const moveToNextStep = () => {
    if (signupStep === 'step1') {
      setSignupStep('step2');
    } else if (signupStep === 'step2') {
      setSignupStep('step3');
    }
  }

  return (
    <div>
      {signupStep === 'step1' && <SignUpFirstStep setEmail={setEmail} moveToNextStep={moveToNextStep} />}
      {signupStep === 'step2' && <SignUpSecondStep moveToNextStep={moveToNextStep} />}
      {signupStep === 'step3' && <SignUpThirdStep email={email} />}
    </div>
  );
}

export default SignUp;