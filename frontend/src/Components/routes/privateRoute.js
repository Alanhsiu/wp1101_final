import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { selectSession } from "../slices/sessionSlice";

export default function PrivateRoute({ element, path }) {
  const { isLogin } = useSelector(selectSession);
  console.log("test")
  return isLogin ? <Outlet /> : <Navigate to="/login" />;
}
