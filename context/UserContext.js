import React from "react";
import { useApiRequest } from "../hooks/ApiRequest";

export const UsersContext = React.createContext();

const UsersProvider = ({ children }) => {
  const [user, setUser] = React.useState("");
  const { data, error, isLoaded,setData } = useApiRequest(
    "http://localhost:4000/api/users"
  );

  const findOne = (id) => {
    const { data, error, isLoaded } = useApiRequest(
      `http://localhost:4000/api/users/${id}`
    );
    if (data) {
      return data;
    }
    return error;
  };

  const value = {
    findOne,
    data,
    error,
    isLoaded,
    setData
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};

export default UsersProvider;

export const useUserContext = () => {
  return React.useContext(UsersContext);
};
