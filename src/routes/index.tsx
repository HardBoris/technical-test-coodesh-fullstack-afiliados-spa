import { Navigate, Route, Routes } from "react-router-dom";
import { PublicRoutes } from "./PublicRoutes";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/*" element={<PublicRoutes />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
