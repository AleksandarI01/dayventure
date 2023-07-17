import { NavLink, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/user.js";
import { useEffect, useState } from "react";
import { AiFillBell } from "react-icons/ai";
import UserNotifications from "../UserNotifications/UserNotifications.jsx";
import Button from "../Button/Button.jsx";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.user.accessToken);
  const [MenuItems, SetMenuItems] = useState([]);
  const [notifications, SetNotifications] = useState(false);

  useEffect(() => {
    SetMenuItems([
      { name: "Home", link: "/" },
      { name: "Search", link: "/search" },
      { name: "New Trip", link: accessToken ? "/new-trip" : "/login" },
      { name: "Profile", link: accessToken ? "/profile" : "/login" },
    ]);
  }, [accessToken]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    localStorage.removeItem("refreshToken");
    navigate("/");
  };

  const handleViewNotifications = (event) => {
    event.preventDefault();
    SetNotifications(!notifications);
  };

  return (
    <header className="flex justify-between border-b-venture-black relative p-5 border-b border-solid">
      <Link to="/" className="flex gap-4">
        <h4>dayventure</h4>
      </Link>
      <nav className="flex gap-[50px] items-center">
        <ul className="flex gap-[50px] items-center">
          {MenuItems.map((item, idx) => (
            <li key={idx}>
              <NavLink to={item.link} className={"hover:text-venture-green-hovered"}>{item.name}</NavLink>
            </li>
          ))}
        </ul>
        {accessToken ? (
          <div className="flex items-center gap-10">
            {" "}
            <AiFillBell
              onClick={handleViewNotifications}
              className="text-2xl text-venture-black cursor-pointer"
            />
            <Button
            className="text-base text-venture-white uppercase bg-venture-green cursor-pointer px-5 py-2 border-[none]"
            onClickFunction={handleLogout}
          >
            Logout
          </Button>
          </div>
        ) : (
          <div className="flex gap-0.5">
            <button
              className="text-base text-venture-white hover:bg-venture-green-hovered uppercase bg-venture-green cursor-pointer px-5 py-2 border-[none] rounded-[18px_0_0_18px]"
              onClick={() => {
                navigate("/signup");
              }}
            >
              signup
            </button>
            <button
              className="text-base text-venture-white hover:bg-venture-green-hovered uppercase bg-venture-green cursor-pointer px-5 py-2 border-[none] rounded-[0px_18px_18px_0px]"
              onClick={() => {
                navigate("/login");
              }}
            >
              login
            </button>
          </div>
        )}
      </nav>
      {notifications ? <UserNotifications /> : ""}
    </header>
  );
};

export default Header;
