import { ReactNode } from "react";
import { UserProvider } from "./UserContext";
import { ProductProvider } from "./ProductContext";
import { MovementProvider } from "./MovementContext";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => (
  <UserProvider>
    <ProductProvider>
      <MovementProvider>{children}</MovementProvider>
    </ProductProvider>
  </UserProvider>
);
