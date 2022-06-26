import axios from "axios";
import { useRouter } from "next/router";

import React, { useContext } from "react";

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [token, setToken] = React.useState();
  const [user, setUser] = React.useState();

  const login = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/login",
        values
      );
      if (response) {
        // const serialized = serialize("authToken", response.data.token, {
        //   httpOnly: true,
        //   secure: true,
        //   sameSite: "strict",
        //   maxAge: 60 * 60 * 24 * 5,
        //   path: "/",
        // });
        localStorage.setItem("authToken", response.data.token);
        setToken(response.data.token);
        setUser(response.data.user);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    user,
    login,
    token,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};
