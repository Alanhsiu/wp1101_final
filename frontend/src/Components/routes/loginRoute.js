import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { selectSession } from "../slices/sessionSlice";

export default function LoginRoute({ element, path }) {
  return <Outlet />;
}
