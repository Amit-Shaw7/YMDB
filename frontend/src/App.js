import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContentModal from "./components/ContentModal";
import Navbar from "./components/Navbar";
import Navigation from "./components/Navigation";
import Favourite from "./pages/Favourite";
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Signup from "./pages/Signup";
import Trending from "./pages/Trending";
import TvSeries from "./pages/TvSeries";
import { Toaster } from "react-hot-toast";
import { ProtectedRoute } from "./components/ProtectRoute";
import { useDispatch } from "react-redux";
import { loadUser } from "./store/actions/UserActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Trending />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/movies" element={<Movies />} />
        <Route exact path="/tvseries" element={<TvSeries />} />
        <Route exact path="/profile" element={<ProtectedRoute Component={Profile} />} />
        <Route exact path="/favorites" element={<ProtectedRoute Component={Favourite} />} />
        <Route exact path="/:media/:id" element={<ContentModal />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/search" element={<Search />} />
      </Routes>
      <Navigation />
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
