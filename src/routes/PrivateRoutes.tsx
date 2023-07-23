import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
};
