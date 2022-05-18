import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

export const useApiRequest = (url) => {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        console.log(reponse);
        if (response) {
          setIsLoaded(true);
          setData(response.data);
        }
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };
    fetchData();
  }, [url]);

  return { error, data, isLoaded };
};
