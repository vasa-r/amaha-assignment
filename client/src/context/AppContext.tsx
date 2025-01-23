import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { parseJwt } from "../lib/utils";

interface User {
  id: string;
  userName: string;
}

interface AppContextType {
  user: User;
  token: string | null;
  setToken: (token: string | null) => void;
  loginContext: (token: string) => void;
  logoutContext: () => void;
}

interface AppProviderProps {
  children: ReactNode;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AppProvider = ({ children }: AppProviderProps) => {
  const initialData = window.localStorage.getItem("token") || null;
  const initialUser = {
    id: "",
    userName: "",
  };
  const [token, setToken] = useState(initialData);
  const [user, setUser] = useState(initialUser);

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      const userData = parseJwt(storedToken);
      setUser(userData);
      setToken(storedToken);
    }
  }, [token]);

  const loginContext = (token: string) => {
    setToken(token);
    localStorage.setItem("token", token);
    navigate("/main");
  };

  const logoutContext = () => {
    setToken(null);
    setUser(initialUser);
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  const values = {
    user,
    token,
    setToken,
    loginContext,
    logoutContext,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppProvider;
