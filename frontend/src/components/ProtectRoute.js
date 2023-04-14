import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import React, { useEffect } from "react";
import { loadUser } from "../store/actions/UserActions";
import { getToken } from "../utils/token";

export const ProtectedRoute = (props) => {
    const { isAuthenticated } = useSelector(state => state.user);
    const { Component } = props;
    const token = getToken();
    const dispatch = useDispatch();

    useEffect(() => {
        token && dispatch(loadUser());
    }, [isAuthenticated, dispatch , token]);

    return (
        <>
            {(isAuthenticated || token) ? <Component /> : <Navigate to="/login" />}
        </>
    )
};