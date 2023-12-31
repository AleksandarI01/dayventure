import {useState} from "react";
import Button from "../Button/Button";
import InputField from '../InputField/InputField';
import {MdEmail} from 'react-icons/md';
import {axiosDayVenture} from "../../axios/index.js";

const SignUpFirstStep = ({setEmail, moveToNextStep}) => {
    const [email, setEmailInput] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleOnClick = (e) => {
        e.preventDefault();
        axiosDayVenture
            .post("/registration/", {
                email: email,
            })
            .then((res) => {
                if (res.status === 201) {
                    setErrorMessage(null);
                    setEmail(email);
                    moveToNextStep();
                }
            })
            .catch((err) => {
                console.log(err.request.response);
                if (err.request.response === '{"email":["This field may not be blank."],"username":["This field may not be blank."]}') {
                    setErrorMessage("The email field can not be empty!");
                } else if (err.request.response === '{"email":["user with this email already exists."]}') {
                    setErrorMessage("This email is already registered!");
                } else if (err.request.response === '{"email":["Enter a valid email address."]}') {
                    setErrorMessage("Enter a valid email address!");
                }
                console.log(err);
                console.log(err.request.response)
            });
    };
    return (
        <>
            {/*<div className=" flex justify-items-end items-center gap-5 p-5 ">
          <p>Are you already a dayventurer?</p>
          <Button>LOGIN</Button>
        </div>*/}
            <div className="flex-grow flex flex-col justify-center items-center gap-20">
                <h1>Sign Up</h1>
                <InputField
                    type="email"
                    placeholder="Email"
                    icon={MdEmail}
                    color={errorMessage ? "venture-red" : "venture-green"}
                    value={email}
                    onChange={setEmailInput}
                />
                <div className={"w-full h-1"}>
                    {errorMessage && (
                        <p className="signup-erro-message text-venture-red">{errorMessage}</p>
                    )}
                </div>
                <Button onClickFunction={handleOnClick}>Sign Up</Button>
            </div>
        </>
    );
};

export default SignUpFirstStep;
