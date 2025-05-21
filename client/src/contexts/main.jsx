// src/context/main.jsx
import { createContext, useState, useEffect } from "react";
import { setAuthToken } from "../services/api";

// Create the context
export const MainContext = createContext();

// User context provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  const loginUser = (user, token) => {
    setUser(user);
    setToken(token);
    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("token", token);
    setAuthToken(token);
  };

  const logoutUser = () => {
    setUser(null);
    setToken("");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    setAuthToken(null);
  };

  return (
    <MainContext.Provider value={{ user, token, loginUser, logoutUser }}>
      {children}
    </MainContext.Provider>
  );
};