import { Outlet, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";

export const PublicRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
      <Outlet />
    </>
  );
};
