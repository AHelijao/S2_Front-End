import React from "react";
import useAppStateContext from "../hooks/useAppStateContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { appState } = useAppStateContext();

  return appState.isAuthenticated && appState.user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
