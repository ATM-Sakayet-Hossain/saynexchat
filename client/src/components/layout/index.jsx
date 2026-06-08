import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
import Sidebar from "./Sidebar";
import { useGetProfileQuery } from "../../lib/api";
const Layout = () => {
  const { data, error, isFetching } = useGetProfileQuery();

  if (isFetching) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-2xl">Loading Profile...</p>
      </div>
    );
  }
  if (!data) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="flex gap-5">
      <Sidebar profile={data} />
      <Outlet />
    </div>
  );
};

export default Layout;
