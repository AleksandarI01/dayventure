import {useNavigate} from "react-router-dom";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import {axiosDayVenture} from "../../axios/index.js";
import {useState} from "react";

const SignUpThirdStep = ({email}) => {
    const [validationCode, setValidationCode] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [username, setUserName] = useState("");
    const [errorMessage, setErroMessage] = useState("");

    const navigate = useNavigate();


    const handleSubmit = e => {
        e.preventDefault();
        if (password !== passwordRepeat) {
            setErroMessage("Password doesn't match");
            return;
        }
        const verify = async () => {
            try {
                const req = await axiosDayVenture.post("/registration/validate/",
                    {
                        email: email,
                        code: validationCode,
                        first_name: firstName,
                        last_name: lastName,
                        password: password,
                        password_repeat: passwordRepeat,
                        username: username,
                    }
                );
                if (req.status === 200) {
                    navigate("/login", {replace: true});
                }
            } catch (err) {
                setErroMessage(err.message);
            }
        };
        verify();
    };


    return (
        <>
            <form className="flex flex-col items-center  gap-10" onSubmit={handleSubmit}>
                <InputField type="text" placeholder="Validation Code" onChange={setValidationCode}/>
                <div className="flex gap-5">
                    <InputField type="email" placeholder="Email" value={email} disabled={true}/>
                    <InputField type="text" placeholder="Username" onChange={setUserName}/>
                </div>
                <div className="flex gap-5">
                    <InputField type="text" placeholder="First Name" onChange={setFirstName}/>
                    <InputField type="text" placeholder="Last Name" onChange={setLastName}/>
                </div>
                <div className="flex gap-5">
                    <InputField type="password" placeholder="Password" onChange={setPassword}/>
                    <InputField type="password" placeholder="Confirm Password" onChange={setPasswordRepeat}/>
                </div>
                <div className={"w-full h-1"}>
                    {errorMessage && (
                        <p className="signup-erro-message text-venture-red">{errorMessage}</p>
                    )}
                </div>
                <Button type="submit">SUBMIT</Button>
            </form>
        </>
    );
};

export default SignUpThirdStep;
  