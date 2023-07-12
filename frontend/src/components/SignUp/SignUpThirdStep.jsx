import React, { useState } from "react";
import Button from "../Button/Button";
import AnimatedSignUpImage from "../AnimatedSignUpImage/AnimatedSignUpImage";
const SignUpThirdStep = () => {

    return (
      <>
        <form> 
          <input type="text" placeholder="Validation Code" />
          <input type="email" placeholder="Email" />
          <input type="text" placeholder="Username" />
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirma Password" />
          <AnimatedSignUpImage />
          <Button>SUBMIT</Button>
        </form>
      </>
    );
  };
  
  export default SignUpThirdStep;
  