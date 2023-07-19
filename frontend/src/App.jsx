import "./App.css";
import {Routes, Route} from "react-router-dom";
import Layout from "./layout";
import Home from "./pages/Home";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import Search from "./pages/Search";
import UserProfile from "./pages/UserProfile";
import AboutUs from "./pages/AboutUs";
import NewTrip from "./pages/NewTrip";
import Trip from "./pages/Trip";
import NotFound from "./pages/NotFound";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner.jsx";
import {axiosDayVenture} from "./axios/index.js";
import {useEffect} from "react";
import {login, logout, setAllInformation} from "./store/slices/user.js";
import {useDispatch, useSelector} from "react-redux";

function App() {
    const accessToken = useSelector((state) => state.user.accessToken);
    const dispatch = useDispatch();

    useEffect(() => {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
            axiosDayVenture
                .post("/auth/token/refresh/", {
                    refresh: refreshToken,
                })
                .then((response) => {
                    dispatch(login(response.data.access));
                })
                .catch((error) => {
                    console.error(error);

                    localStorage.removeItem("refreshToken");
                    dispatch(logout());
                });
        } else {
            dispatch(logout());
        }
    }, [dispatch]);

    useEffect(() => {
        if (accessToken) {
            const config = {headers: {Authorization: `Bearer ${accessToken}`}};
            axiosDayVenture
                .get("/users/me/", config)
                .then((res) => {
                    dispatch(
                        setAllInformation({
                            id: res.data.id,
                            firstName: res.data.first_name,
                            lastName: res.data.last_name,
                            username: res.data.username,
                            avatar: res.data.avatar,
                            banner: res.data.banner,
                            location: res.data.location,
                            about: res.data.about,
                            email: res.data.email,
                            score: res.data.score,
                            level: res.data.level,
                        })
                    );
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [accessToken, dispatch]);

    if (accessToken || accessToken === null) {
        return (
            <>
                <Routes>
                    <Route element={<Layout/>}>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/signup" element={<Signup/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/search" element={<Search/>}/>
                        <Route path="/search/users/:userId" element={<UserProfile/>}/>
                        <Route path="/profile" element={<UserProfile/>}/>
                        <Route path="/about-us" element={<AboutUs/>}/>
                        <Route path="/new-trip" element={<NewTrip/>}/>
                        {/*<Route path="/trip" element={<Trip/>}/>*/}
                        <Route path="/trip/:tripId" element={<Trip/>}/>
                    </Route>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </>
        );
    } else {
        return (
            <>
                    <div className={"w-full h-full flex align-middle justify-center items-center"}>
                        <LoadingSpinner/>
                    </div>
            </>
        )

    }
}

export default App;
