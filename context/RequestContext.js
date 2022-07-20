import { message } from "antd";
import axios from "axios";
import React, { useContext } from "react";
import { useApiRequest } from "../hooks/ApiRequest";

export const RequestContext = React.createContext();

const RequestProvider = ({ children }) => {
  const {
    data: fromServer,
    error,
    isLoaded,
  } = useApiRequest("http://localhost:4000/api/requests");
  const [data, setData] = React.useState(fromServer);

  const deleteRequest = async (id, token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(
        `http://localhost:4000/api/requests/${id}`,
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

  const updateRequest = async (values, token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      console.log(values);
      const response = await axios.patch(
        `http://localhost:4000/api/requests/${values.id}`,
        values,
        config
      );

      if (response) {
        setData((pre) => {
          return pre.map((transaction) => {
            if (transaction.id === values.id) {
              return values;
            } else {
              return transaction;
            }
          });
        });
        message.success(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const saveRequest = async (values, token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const dataTosave = {
        ...values,
        status: "created",
      };

      const response = await axios.post(
        "http://localhost:4000/api/requests/",
        dataTosave,
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
    data,
    deleteRequest,
    saveRequest,
    updateRequest,
    error,
    isLoaded,
  };

  return (
    <RequestContext.Provider value={value}>{children}</RequestContext.Provider>
  );
};

export default RequestProvider;

export const useRequest = () => {
  return useContext(RequestContext);
};
