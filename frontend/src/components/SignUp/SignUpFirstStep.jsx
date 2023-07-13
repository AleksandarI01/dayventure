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
      {/*<div className=" flex justify-items-end items-center gap-5 p-5 ">
          <p>Are you already a dayventurer?</p>
          <Button>LOGIN</Button>
        </div>*/}
      <div className="flex-grow flex flex-col justify-center items-center gap-20">
        <h1>Sign Up</h1>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmailInput(e.target.value)}
        />
        <AnimatedSignUpImage />
        <Button onClickFunction={(e) => handleOnClick(e)}>Sign Up</Button>
      </div>
    </>
  );
};

export default SignUpFirstStep;
