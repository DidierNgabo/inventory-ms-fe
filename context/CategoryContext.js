import { message } from "antd";
import axios from "axios";
import React, { useContext } from "react";
import { useApiRequest } from "../hooks/ApiRequest";

export const CategoriesContext = React.createContext();

const CategoriesProvider = ({ children }) => {
  const { data, error, isLoaded } = useApiRequest(
    "http://localhost:4000/api/categories"
  );

  const deleteCategory = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/categories/${id}`
      );
      if (response) {
        return response.data;
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const updateCategory = async (values) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/categories/${values.id}`,
        values
      );

      if (response) {
        data.push(values);
        message.success(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const saveCategory = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/categories/",
        values
      );

      if (response) {
        data.push(values);
        message.success(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const value = {
    data,
    deleteCategory,
    saveCategory,
    updateCategory,
    error,
    isLoaded,
  };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesProvider;

export const useCategoryContext = () => {
  return useContext(CategoriesContext);
};
