import React, { useState } from "react";
import Button from "../Button/Button";
import AnimatedSignUpImage from "../AnimatedSignUpImage/AnimatedSignUpImage";
const SignUpFirstStep = ({ setEmail, moveToNextStep }) => {
  const [email, setEmailInput] = useState("");

  const handleOnClick = (e) => {
    e.preventDefault();
    setEmail(email);
    moveToNextStep();
  };
  return (
    <>
      <div className="flex flex-col ">
        <div className="flex flex-row justify-end items-center gap-5 p-5">
          <p>Are you already a dayventurer?</p>
          <Button>LOGIN</Button>
        </div>

        <div className="flex flex-col items-center  ">
          <h1>Sign Up</h1>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <AnimatedSignUpImage />
          <Button onClickFunction={(e) => handleOnClick(e)}>Sign Up</Button>
        </div>
      </div>
    </>
  );
};

export default SignUpFirstStep;
