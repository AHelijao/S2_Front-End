import React from "react";
import useAppStateContext from "../hooks/useAppStateContext";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { appState } = useAppStateContext();

  return !appState.isAuthenticated && !appState.user ? (
    <Outlet />
  ) : (
    <Navigate to="/home" />
  );
};

export default PublicRoute;
