import "./App.css";
<<<<<<< HEAD
import { Routes, Route } from "react-router-dom";
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
=======
>>>>>>> 4e43fb09a68693062188d4f269abea28f7b6588c

function App() {
  return (
    <>
<<<<<<< HEAD
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search/users/:userId" element={<UserProfile />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/new-trip" element={<NewTrip />} />
          <Route path="/trip" element={<Trip />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
=======
      <div>
        <p className="text-3xl font-bold underline">Hello pablo</p>
        <p className=" text-venture-green">hellloooooo</p>
      </div>
>>>>>>> 4e43fb09a68693062188d4f269abea28f7b6588c
    </>
  );
}

export default App;
