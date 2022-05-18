import React, { createContext, useState } from "react";
import { useApiRequest } from "../hooks/ApiRequest";

export const UsersContext = createContext();

const UsersProvider = ({ children }) => {
  const { data, error, isLoaded } = useApiRequest(
    "http://localhost:4000/users"
  );

  const value = {
    data,
    error,
    isLoaded,
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};

export default UsersProvider;
