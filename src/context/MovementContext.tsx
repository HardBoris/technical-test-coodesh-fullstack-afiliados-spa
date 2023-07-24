import { ReactNode, createContext, useContext, useState } from "react";
import { localApi as api } from "../services/api";
import { useAuth } from "./UserContext";

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
  moveList: Movement[];
  saveMovement: (info: MovementInfo) => void;
  movementsList: () => void;
}

export const MovementContext = createContext<MovementContextData>(
  {} as MovementContextData
);

const useMovement = () => useContext(MovementContext);

const MovementProvider = ({ children }: MovementProviderProps) => {
  const { token } = useAuth();
  const [movement, setMovement] = useState<Movement>({} as Movement);
  const [moveList, setMoveList] = useState<Movement[]>([]);

  const saveMovement = async ({
    type,
    date,
    product,
    price,
    seller,
  }: MovementInfo) => {
    await api
      .post(
        "/movements/register",
        { type, date, product, price, seller },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then((response) => setMovement(response.data))
      .catch((error) => console.log(error));
  };

  const movementsList = async () => {
    await api
      .get("/movements", { headers: { authorization: `Bearer ${token}` } })
      .then((response) => setMoveList(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <MovementContext.Provider
      value={{ movement, moveList, saveMovement, movementsList }}
    >
      {children}
    </MovementContext.Provider>
  );
};

export { useMovement, MovementProvider };
