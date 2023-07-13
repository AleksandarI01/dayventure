import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import AnimatedSignUpImage from "../AnimatedSignUpImage/AnimatedSignUpImage";

const SignUpThirdStep = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // add your signup logic here
    navigate("/login");
  };

    return (
      <>
        <form className="flex flex-col items-center  gap-10" onSubmit={handleSubmit}> 
          <InputField type="text" placeholder="Validation Code"/>
          <div className="flex gap-5">
            <InputField type="email" placeholder="Email" />
            <InputField type="text" placeholder="Username" />
          </div>
          <div className="flex gap-5">
            <InputField type="text" placeholder="First Name" />
            <InputField type="text" placeholder="Last Name" />
          </div>
          <div className="flex gap-5">
            <InputField type="password" placeholder="Password" />
            <InputField type="password" placeholder="Confirm Password" />
          </div>
          <AnimatedSignUpImage/>
          <Button type="submit">SUBMIT</Button>
        </form>
      </>
    );
  };
  
  export default SignUpThirdStep;
  