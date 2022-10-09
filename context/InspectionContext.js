import { message } from "antd";
import axios from "axios";
import React, { useContext } from "react";

export const InspectionContext = React.createContext();

const InspectionProvider = ({ children }) => {
  const deleteInspection = async (id, token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(
        `http://localhost:4000/api/inspections/${id}`,
        config
      );
      if (response) {
        message.success(response.data.message);
        // setData(data.filter((quotation) => quotation.id !== id));
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const updateInspection = async (values, token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.patch(
        `http://localhost:4000/api/inspections/${values.id}`,
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

  const saveInspection = async (values, token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        "http://localhost:4000/api/inspections/",
        values,
        config
      );
      if (response) {
        message.success("inspection saved successfully");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const value = {
    deleteInspection,
    saveInspection,
    updateInspection,
  };

  return (
    <InspectionContext.Provider value={value}>
      {children}
    </InspectionContext.Provider>
  );
};

export default InspectionProvider;

export const useInspection = () => {
  return useContext(InspectionContext);
};
