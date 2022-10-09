import axios from "axios";
import React from "react";

export const useApiRequest = (url) => {
  const [data, setData] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        if (response) {
          setIsLoaded(true);
          setData(response.data);
        }
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [url]);

  return { error, data,setData, isLoaded };
};
