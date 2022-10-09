import { message } from "antd";
import axios from "axios";
import React, { useContext } from "react";
import { useApiRequest } from "../hooks/ApiRequest";

export const TransactionContext = React.createContext();

const TransactionProvider = ({ children }) => {
  const {
    data: fromServer,
    error,
    isLoaded,
  } = useApiRequest("http://localhost:4000/api/transactions");
  const [data, setData] = React.useState(fromServer);

  const { data: count } = useApiRequest(
    "http://localhost:4000/api/transactions/count"
  );

  const [transactionsCount, setTransactionsCount] = React.useState(count);

  const deleteTransaction = async (id, token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(
        `http://localhost:4000/api/transactions/${id}`,
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

  const updateTransaction = async (values, token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.patch(
        `http://localhost:4000/api/transactions/${values.id}`,
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
        message.success("Transaction updated Successfully");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const saveTransaction = async (values, token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        "http://localhost:4000/api/transactions/",
        values,
        config
      );

      if (response) {
        setData((prev)=>[...prev,values])
        message.success("Transaction Saved Sucessfully");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const value = {
    data,
    deleteTransaction,
    saveTransaction,
    updateTransaction,
    error,
    transactionsCount,
    setTransactionsCount,
    isLoaded,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;

export const useTransaction = () => {
  return useContext(TransactionContext);
};
