import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
          <input type="text" placeholder="Validation Code" className="w-full"/>
          <div className="flex gap-5">
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="Username" />
          </div>
          <div className="flex gap-5">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
          </div>
          <div className="flex gap-5">
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm Password" />
          </div>
          <AnimatedSignUpImage/>
          <Button type="submit">SUBMIT</Button>
        </form>
      </>
    );
  };
  
  export default SignUpThirdStep;
  