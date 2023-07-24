import { ReactNode, createContext, useContext, useState } from "react";

interface MovementProviderProps {
  children: ReactNode;
}

export interface Movement {
  movementId: string;
  type: string;
  date: string;
  product: string;
  price: number;
  seller: string;
}

export interface MovementInfo {
  type: string;
  date: string;
  product: string;
  price: number;
  seller: string;
}

interface MovementContextData {
  movement: Movement;
}

export const MovementContext = createContext<MovementContextData>(
  {} as MovementContextData
);

const useMovement = () => useContext(MovementContext);

const MovementProvider = ({ children }: MovementProviderProps) => {
  const [movement, setMovement] = useState<Movement>({} as Movement);
  return (
    <MovementContext.Provider value={{ movement }}>
      {children}
    </MovementContext.Provider>
  );
};

export { useMovement, MovementProvider };
