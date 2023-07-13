import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import { MdAccountCircle, MdLock } from 'react-icons/md';
const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // add your signup logic here
    navigate("/");
  };
  return (
    <>
      <div className="h-[87.5vh] flex flex-col justify-center items-center gap-20 ">
        <h1>Login</h1>
        <div className="flex flex-col gap-20">
          <div className="flex flex-col gap-7">
            <InputField type="email" placeholder="Email" icon={MdAccountCircle} color={"venture-green"} />
            <InputField type="password" placeholder="Password" icon={MdLock} color={"venture-green"} />
          </div>
          <div>
            <Button onClickFunction={(e) => handleSubmit(e)}>Login</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
