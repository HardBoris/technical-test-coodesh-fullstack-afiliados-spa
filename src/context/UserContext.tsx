import { createContext, ReactNode, useContext, useState } from "react";
import { localApi as api } from "../services/api";

interface UserProviderProps {
  children: ReactNode;
}

export interface User {
  userId: string;
  userName: string;
  userPassword?: string;
}

interface AuthState {
  token: string;
  user: User;
}

export interface SignInInfo {
  userName: string;
  userPassword?: string;
}

interface UserContextData {
  user: User;
  token: string;
  signIn: (credentials: SignInInfo) => Promise<void>;
  signOut: () => void;
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
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@Coodesh:token");
    const user = localStorage.getItem("@Coodesh:user");

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = async ({ userName, userPassword }: SignInInfo) => {
    await api
      .post("/login", { userName, userPassword })
      .then((response) => {
        const { user, token } = response.data;
        localStorage.setItem("@Coodesh:token", token);
        localStorage.setItem("@Coodesh:user", JSON.stringify(user));
        setData({ user, token });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signOut = () => {
    localStorage.removeItem("@Coodesh:token");
    localStorage.removeItem("@Coodesh:user");

    setData({} as AuthState);
  };

  return (
    <UserContext.Provider
      value={{
        token: data.token,
        user: data.user,
        signIn,
        signOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, useAuth };
