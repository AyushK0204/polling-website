import React, { createContext, useState, useEffect } from "react";
import api from "../api";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const { data } = await api.get("/users/me");
        setUser(data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUserSession();
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post("/users/login", { email, password });
    if (data && data.user) {
      setUser(data.user);
    }
  };

  const register = async (name, email, password) => {
    const { data } = await api.post("/users/register", {
      name,
      email,
      password,
    });

    if (data && data.user) {
      setUser(data.user);
    }
  };

  const logout = async () => {
    await api.post("/users/logout");
    setUser(null);
  };

  const value = {
    user,
    setUser,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
