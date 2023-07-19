import { NavLink, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/user.js";
import { useEffect, useState } from "react";
import { MdNotifications } from "react-icons/md";
import UserNotifications from "../UserNotifications/UserNotifications.jsx";
import Button from "../Button/Button.jsx";
import { axiosDayVenture } from "../../axios/index.js";
import Arrow from '../Arrow/Arrow.jsx';


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.user.accessToken);
  const [MenuItems, SetMenuItems] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [notificationNumber, setNotificationNumber] = useState(0);
  const [loadNotifications, setLoadNotifications] = useState(0);

  useEffect(() => {
    SetMenuItems([
      { name: "Home", link: "/" },
      { name: "Search", link: "/search" },
      { name: "New Trip", link: accessToken ? "/new-trip" : "/login" },
      { name: "Profile", link: accessToken ? "/profile" : "/login" },
    ]);
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      setNotificationNumber(0);
      const config = { headers: { Authorization: `Bearer ${accessToken}` } };
      axiosDayVenture
        .get("/friends/requests/", config)
        .then((res) => {
          setFriendRequests(res.data);
          setNotificationNumber((prevState) => prevState + res.data.length);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
      axiosDayVenture
        .get("/notifications/", config)
        .then((res) => {
          setNotifications(res.data);
          setNotificationNumber((prevState) => prevState + res.data.length);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [accessToken, loadNotifications]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    localStorage.removeItem("refreshToken");
    setShowNotifications(false);
    navigate("/");
  };

  const handleViewNotifications = (e) => {
    e.preventDefault();
    setShowNotifications(!showNotifications);
  };

  const processNotificationNumber = (num) => {
    return num > 9 ? '9+' : num;
  };

  return (
    <>
    <header className="flex justify-between border-b-venture-black p-5 border-b border-solid z-10">
      <Link to="/" className="flex gap-4">
        <h4>dayventure</h4>
      </Link>
      <nav className="flex gap-[50px] items-center">
        <ul className="flex gap-[50px] items-center">
          {MenuItems.map((item, idx) => (
            <li key={idx}>
              <NavLink
                to={item.link}
                className={"hover:text-venture-green-hovered"}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
        {accessToken ? (
          <div className="flex items-center gap-10">
            <div style={{ position: 'relative' }}>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <MdNotifications
                    onClick={handleViewNotifications}
                    className="text-3xl text-venture-black cursor-pointer"

                  />
                  {notificationNumber > 0 && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '-6px',
                        right: '-6px',
                        background: 'red',
                        borderRadius: '50%',
                        width: '19px',
                        height: '19px',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <p>{processNotificationNumber(notificationNumber)}</p>
                    </div>
                  )}
                  {showNotifications && <Arrow />}
                </div>
              </div>
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
      
      
    </header>
    {showNotifications && (
        <UserNotifications
          notifications={notifications}
          friendRequests={friendRequests}
          setLoadNotifications={setLoadNotifications}
        />
      )}
    </>
  );
};

export default Header;
