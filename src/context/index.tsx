import { ReactNode } from "react";
import { UserProvider } from "./UserContext";
import { ProductProvider } from "./ProductContext";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => (
  <UserProvider>
    <ProductProvider>{children}</ProductProvider>
  </UserProvider>
);
