import { NavLink, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/user.js";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const access_token = useSelector((state) => state.user.accessToken);
  const [MenuItems, SetMenuItems] = useState([]);

  useEffect(() => {
    SetMenuItems([
      { name: "Home", link: "/" },
      { name: "Search", link: "/search" },
      { name: "Profile", link: access_token ? "/profile" : "/login" },
    ]);
  }, [access_token]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    localStorage.removeItem("refreshToken");
    navigate("/");
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
              <NavLink to={item.link}>{item.name}</NavLink>
            </li>
          ))}
        </ul>
        {access_token ? (
          <button
            className="text-base text-venture-black uppercase bg-venture-green cursor-pointer px-5 py-2 border-[none]"
            onClick={handleLogout}
          >
            logout
          </button>
        ) : (
          <div className="flex gap-0.5">
            <button
              className="text-base text-venture-black uppercase bg-venture-green cursor-pointer px-5 py-2 border-[none] rounded-[18px_0_0_18px]"
              onClick={() => {
                navigate("/signup");
              }}
            >
              signup
            </button>
            <button
              className="text-base text-venture-black uppercase bg-venture-green cursor-pointer px-5 py-2 border-[none] rounded-[0px_18px_18px_0px]"
              onClick={() => {
                navigate("/login");
              }}
            >
              login
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
