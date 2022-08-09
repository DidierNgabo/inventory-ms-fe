import { message } from "antd";
import axios from "axios";
import React, { useContext } from "react";
import { useApiRequest } from "../hooks/ApiRequest";

export const CategoriesContext = React.createContext();

const CategoriesProvider = ({ children }) => {
  const { data: fromServer } = useApiRequest(
    "http://localhost:4000/api/categories"
  );
  console.log(fromServer);

  const [data, setData] = React.useState(fromServer);
  console.log(data);

  const deleteCategory = async (id, token) => {
    console.log(token, id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.delete(
        `http://localhost:4000/api/categories/${id}`,
        config
      );
      console.log(response);
      if (response) {
        message.success(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const updateCategory = async (values, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.put(
        `http://localhost:4000/api/categories/${values.id}`,
        values,
        config
      );

      if (response) {
        data.push(values);
        message.success(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const saveCategory = async (values, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.post(
        "http://localhost:4000/api/categories/",
        values,
        config
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
