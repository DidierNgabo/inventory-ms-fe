import React from "react";
import axios from "axios";

export const useDeleteRequest = (url, id) => {
  const [message, setMessage] = React.useState("");

  const deleteData = async () => {
    try {
      const response = await axios.delete(`${url}/${id}`);
      if (response) {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage(error.message);
    }
    deleteData();

    return { message };
  };
};
