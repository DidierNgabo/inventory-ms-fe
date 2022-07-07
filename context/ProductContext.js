import { message } from "antd";
import axios from "axios";
import React, { useContext } from "react";
import { useApiRequest } from "../hooks/ApiRequest";

export const ProductContext = React.createContext();

const ProductProvider = ({ children }) => {
  const { data, error, isLoaded } = useApiRequest(
    "http://localhost:4000/api/products"
  );

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/products/${id}`
      );
      if (response) {
        return response.data;
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const updateProduct = async (values) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/products/${values.id}`,
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

  const saveProduct = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/products/",
        values
      );

      if (response) {
        data.push(values);
        message.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error(error.message);
    }
  };

  const value = {
    data,
    deleteProduct,
    saveProduct,
    updateProduct,
    error,
    isLoaded,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export default ProductProvider;

export const useProductContext = () => {
  return useContext(ProductContext);
};
