import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const AdminRoute = () => {
  const { user, loading } = useContext(AppContext);

  if (loading) {
    return <p className="text-center mt-8">Loading...</p>;
  }

  return user && user.role === "admin" ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
