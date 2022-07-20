import { message } from "antd";
import axios from "axios";
import React, { useContext } from "react";

export const RoleContext = React.createContext();

const RoleProvider = ({ children }) => {
  const deleteRole = async (id, token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(
        `http://localhost:4000/api/roles/${id}`,
        config
      );
      if (response) {
        message.success(response.data.message);
        setData(data.filter((quotation) => quotation.id !== id));
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const updateRole = async (values, token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `http://localhost:4000/api/roles/${values.id}`,
        values,
        config
      );

      if (response) {
        message.success(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const saveRole = async (values, token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        "http://localhost:4000/api/roles/",
        values,
        config
      );

      if (response) {
        message.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error(error.message);
    }
  };

  const value = {
    deleteRole,
    saveRole,
    updateRole,
  };

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};

export default RoleProvider;

export const useRole = () => {
  return useContext(RoleContext);
};
