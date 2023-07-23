import { createContext, ReactNode, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

import { localApi as api } from "../services/api";
// import { api } from "../services/api";

interface UserProviderProps {
  children: ReactNode;
}

interface User {
  userId: string;
  userName: string;
  email: string;
}

interface AuthState {
  token: string;
  user: User;
  company: string;
}

interface SignInCredentials {
  userName: string;
  userPassword: string;
  companyCode: string;
}

interface UserContextData {
  user: User;
  token: string;
  company: string;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  signUp: (info: SignInCredentials) => void;
  // mensaje: string;
  // email: string;
  // status: number;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

const useAuth = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

const UserProvider = ({ children }: UserProviderProps) => {
  const history = useNavigate();
  const [logedUser, setLogedUser] = useState("");
  // const [messageError, setMessageError] = useState("");
  // const [status, setStatus] = useState(0);

  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@Aventura:token");
    const user = localStorage.getItem("@Aventura:user");
    const company = localStorage.getItem("@Aventura:company");

    if (token && user && company) {
      return { token, user: JSON.parse(user), company };
    }

    return {} as AuthState;
  });

  const signIn = async ({
    userName,
    userPassword,
    companyCode,
  }: SignInCredentials) => {
    // const aviso = toast.loading("Por Favor espere...");
    await api
      .post("/login", { userName, userPassword, companyCode })
      .then((response) => {
        const { user, token, company } = response.data;
        localStorage.setItem("@Aventura:token", token);
        localStorage.setItem("@Aventura:user", JSON.stringify(user));
        localStorage.setItem("@Aventura:company", company);
        setData({ user, token, company });
        history(`/${company}`);
        /* toast.update(aviso, {
          render: "Bem-Vindo a Oikos!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        }); */
      })
      .catch((error) => {
        console.log(error);
        /* toast.update(aviso, {
          render: error.response.data.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        }); */
      });
  };

  const signUp = async ({ userName, userPassword }: SignInCredentials) => {
    // const aviso = toast.loading("Por Favor espere...");
    await api
      .post("/:companyId/users/register", {
        userName,
        userPassword,
      })
      .then((response) => {
        console.log(response.data);
        const { usuario } = response.data;
        setLogedUser(usuario);
        /* toast.update(aviso, {
          render: "Novo usuário cadastrado!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        }); */
      })
      .then(() => history("/login"))
      .catch((error) => {
        console.log(error);
        /* toast.update(aviso, {
          render: error.response.data.message,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        }); */
      });
  };

  const signOut = () => {
    localStorage.removeItem("@Aventura:token");
    localStorage.removeItem("@Aventura:user");
    localStorage.removeItem("@Aventura:company");

    setData({} as AuthState);
  };

  return (
    <UserContext.Provider
      value={{
        token: data.token,
        user: data.user,
        company: data.company,
        signIn,
        signOut,
        signUp,
        // mensaje,
        // email,
        // status,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, useAuth };
