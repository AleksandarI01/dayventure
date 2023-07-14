import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import { MdAccountCircle, MdLock } from 'react-icons/md';
import {axiosDayVenture} from "../../axios/index.js";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {login} from "../../store/slices/user.js";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const dispatch = useDispatch();

  const handleLogIn = (e) => {
    e.preventDefault();
    axiosDayVenture
        .post("/auth/token/", {
          email: email,
          password: password,
        })
        .then(res => {
          if (res.status === 200) {
            const refreshToken = res.data.refresh;
            const accessToken = res.data.access;
            localStorage.setItem("refreshToken", refreshToken);
            setErrorMessage(null);
            dispatch(login(accessToken));
            navigate("/", { replace: true });
          }
        })
        .catch(err => {
          if (err.message === "Request failed with status code 401") {
            setErrorMessage("The provided email or password is not correct!");
          }

          console.log(err);
        });
  };
  return (
    <>
      <div className="h-[87.5vh] flex flex-col justify-center items-center gap-20 ">
        <h1>Login</h1>
        <form className="flex flex-col gap-20" onSubmit={handleLogIn}>
          <div className="flex flex-col gap-7">
            <InputField type="email"
                        value={email}
                        required
                        onChange={e => setEmail(e)}
                        placeholder="Email"
                        icon={MdAccountCircle}
                        color={"venture-green"} />
            <InputField type="password"
                        value={password}
                        required
                        onChange={e => setPassword(e)}
                        placeholder="Password"
                        icon={MdLock}
                        color={"venture-green"} />
          </div>
          {errorMessage && <p className="signup-erro-message">{errorMessage}</p>}
          <div>
            <Button onClickFunction={handleLogIn}>Login</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
