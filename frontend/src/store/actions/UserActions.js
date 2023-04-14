import { toast } from "react-hot-toast";
import axios from "../../utils/axiosInstance";
import { config } from "../../utils/requestConfig";
import { setToken } from "../../utils/token";

export const loadUser = () => async (dispatch) => {
    const url = "/auths/getUser";
    dispatch({ type: "LOADING_START" });
    try {
        const res = await axios.get(url, config);
        if (res.status === 200) {
            dispatch({ type: "LOAD_USER_SUCCESS", payload: res?.data?.user });
            return true;
        }
    } catch (error) {
        dispatch({ type: "LOAD_USER_FAILED" });
        toast.error(error?.response?.data?.msg);
        return false;
    }
}
export const login = (data) => async (dispatch) => {
    const url = `/auths/login`;
    dispatch({ type: "LOADING_START" });
    try {
        const res = await axios.post(url, data);
        if (res.status === 200) {
            dispatch({ type: "LOGIN_SUCCESS", payload: res?.data?.user });
            toast.success("Login succesfull");
            setToken(res?.data?.token);
            return true;
        }
    } catch (error) {
        dispatch({ type: "LOGIN_FAILED" });
        toast.error(error?.response?.data?.msg);
        return false;
    }
}
export const signup = (data) => async (dispatch) => {
    const url = `/auths/register`;
    dispatch({ type: "LOADING_START" });
    try {
        const res = await axios.post(url, data);
        if (res.status === 200) {
            dispatch({ type: "SIGNUP_SUCCESS" });
            toast.success("Signup succesfull");
            return true;
        }
    } catch (error) {
        dispatch({ type: "SIGNUP_FAILED" });
        toast.error(error?.response?.data?.msg);
        return false;
    }
}

export const logout = () => async (dispatch) => {
    localStorage.removeItem("_MOVIE_DB_TOKEN");
    dispatch({ type: "LOGOUT_SUCCESS" });
}