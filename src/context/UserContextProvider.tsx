// AuthContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { setCookie, getCookie, removeCookie } from "../lib/cookies";
import { IUser } from "../types";
import { axiosInstance } from "../services/axios.config";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  user: IUser | null;
  login: (username: string, password: string) => void;
  logout: () => void;
  token: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>("");
  const nav = useNavigate();
  useEffect(() => {
    const userCookie: IUser = getCookie("user");
    const token = getCookie("token");
    if (userCookie) {
      setUser(userCookie);
    }
    if (token) {
      setToken(token);
    }
  }, []);
  const login = async (email: string, password: string) => {
    const res = await axiosInstance.post("/auth/login", { email, password });

    const userData = res.data.data;
    const token = res.data.token;
    sessionStorage.setItem("role", res.data.data.role);
    setUser(userData);
    setToken(token);
    setCookie("user", userData, { maxAge: 360000 }); // Expires in 100 hour
    setCookie("token", token, { maxAge: 360000 }); // Expires in 100 hour
  };
  const logout = () => {
    setUser(null);
    setToken(null);
    removeCookie("user");
    removeCookie("token");
    nav("/");
  };
  const value = { user, login, logout, token };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
