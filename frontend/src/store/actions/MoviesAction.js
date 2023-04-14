import { toast } from "react-hot-toast";
import axios from "../../utils/axiosInstance";
import { config } from "../../utils/requestConfig";

export const fetchFavMovies = () => async (dispatch) => {
    const url = "/movies/yourmovies";
    dispatch({ type: "LOADING_START" });
    try {
        const res = await axios.get(url, config);
        if (res.status === 200) {
            dispatch({ type: "FETCH_ALL_FAVOURITE_MOVIES", payload: res?.data?.movies });
            return true;
        }
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return false;
    }
}
export const addToFavourite = (movieData) => async (dispatch) => {
    const url = "/movies/add";
    dispatch({ type: "LOADING_START" });
    try {
        const res = await axios.post(url, movieData, config);
        console.log(res);
        if (res.status === 200) {
            console.log(res?.data?.movie);
            dispatch({ type: "ADD_TO_FAV", payload: res?.data?.movie });
            toast.success("Movie added")
            return true;
        }
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return false;
    }
}
export const removeFromFavourite = (movieId) => async (dispatch) => {
    const url = `/movies/remove/${movieId}`;
    dispatch({ type: "LOADING_START" });
    try {
        const res = await axios.delete(url, config);
        console.log(res);
        if (res.status === 200) {
            console.log(res?.data?.movie);
            dispatch({ type: "REMOVE_FROM_FAV", payload: res?.data?.movie });
            toast.success("Movie removed")
            return true;
        }
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return false;
    }
}
