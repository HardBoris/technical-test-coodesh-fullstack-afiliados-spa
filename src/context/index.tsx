import { ReactNode } from "react";
import { UserProvider } from "./UserContext";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => (
  <UserProvider>{children}</UserProvider>
);
