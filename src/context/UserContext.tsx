import { createContext, ReactNode, useContext, useState } from "react";
import { localApi as api } from "../services/api";

interface UserProviderProps {
  children: ReactNode;
}

export interface User {
  id: string;
  name: string;
  password?: string;
}

interface AuthState {
  token: string;
  user: User;
}

export interface SignInInfo {
  userName: string;
  userPassword: string;
}

export interface SignUpInfo {
  userName: string;
}

interface UserContextData {
  user: User;
  token: string;
  thisUser: User;
  signIn: (credentials: SignInInfo) => Promise<void>;
  saveUser: (info: SignUpInfo) => Promise<void>;
  signOut: () => void;
  userFinder: (arg: string) => void;
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

  const [thisUser, setThisUser] = useState<User>({} as User);

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

  const saveUser = async ({ userName }: SignUpInfo) => {
    await api
      .post(
        "/users/register",
        { userName },
        {
          headers: { authorization: `Bearer ${data.token}` },
        }
      )
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  const signOut = () => {
    localStorage.removeItem("@Coodesh:token");
    localStorage.removeItem("@Coodesh:user");

    setData({} as AuthState);
  };

  const userFinder = async (user: string) => {
    await api
      .get(`/users/${user}`, {
        headers: { authorization: `Bearer ${data.token}` },
      })
      .then((response) => setThisUser(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <UserContext.Provider
      value={{
        token: data.token,
        user: data.user,
        thisUser,
        signIn,
        saveUser,
        signOut,
        userFinder,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, useAuth };
