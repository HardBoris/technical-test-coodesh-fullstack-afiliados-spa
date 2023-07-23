import { Navigate, Route, Routes } from "react-router-dom";
import { PublicRoutes } from "./PublicRoutes";
import { useAuth } from "../context/UserContext";
import { PrivateRoutes } from "./PrivateRoutes";

export const AppRouter = () => {
  const { token } = useAuth();
  return (
    <Routes>
      {token ? (
        <Route path="/*" element={<PrivateRoutes />} />
      ) : (
        <Route path="/*" element={<PublicRoutes />} />
      )}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
