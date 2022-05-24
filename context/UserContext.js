import React from "react";
import { useApiRequest } from "../hooks/ApiRequest";

export const UsersContext = React.createContext();

const UsersProvider = ({ children }) => {
  const { data, error, isLoaded } = useApiRequest(
    "http://localhost:4000/api/users"
  );

  console.log(data);
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
