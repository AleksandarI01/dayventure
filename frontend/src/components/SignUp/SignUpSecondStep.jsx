import Button from "../Button/Button";
import AnimatedSignUpImage from "../AnimatedSignUpImage/AnimatedSignUpImage";

const SignUpSecondStep = ({ email, moveToNextStep }) => {
  const handleOnClick = (e) => {
    e.preventDefault()
    moveToNextStep();
  };

  return (
    <>
      <div className="flex-grow flex flex-col justify-center items-center gap-20">
        <h1>Let the adventure begin!</h1>
        <p>
          We've sent a confirmation code to your email
          <br />
          {email}
        </p>
        <AnimatedSignUpImage />
        <Button onClickFunction={handleOnClick}>CONTINUE</Button>
      </div>
    </>
  );
};

export default SignUpSecondStep;
