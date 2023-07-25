import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { localApi as api } from "../services/api";
import { User, useAuth } from "./UserContext";
import { Product } from "./ProductContext";

interface MovementProviderProps {
  children: ReactNode;
}

export interface MovementType {
  id: string;
  type: string;
  kind: string;
}

export interface Movement {
  id: string;
  type: MovementType;
  date: string;
  product: Product;
  price: number;
  seller: User;
}

export interface MovementInfo {
  type: string;
  date: string;
  product: string;
  price: string;
  seller: string;
}

interface MovementContextData {
  movement: Movement;
  moveList: Movement[];
  saveMovement: (info: MovementInfo) => void;
  movementsList: () => void;
  dateFormatter: (data: string) => string;
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
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  const movementsList = async () => {
    await api
      .get("/movements", { headers: { authorization: `Bearer ${token}` } })
      .then((response) => setMoveList(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    movementsList();
  }, []);

  const dateFormatter = (data: string) => {
    const date = new Date(data);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    if (day < 10 && month < 10) {
      return `0${day}/0${month}/${year}`;
    } else if (day >= 10 && month < 10) {
      return `${day}/0${month}/${year}`;
    } else if (day < 10 && month >= 10) {
      return `0${day}/${month}/${year}`;
    } else {
      return `${day}/${month}/${year}`;
    }
  };

  return (
    <MovementContext.Provider
      value={{ movement, moveList, saveMovement, movementsList, dateFormatter }}
    >
      {children}
    </MovementContext.Provider>
  );
};

export { useMovement, MovementProvider };
