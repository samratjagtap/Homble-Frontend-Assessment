// src/hooks/useDataFetching.js
import { useState, useEffect } from 'react';
import { getRequest } from '../axios';

const useDataFetching = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getRequest(url);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError('Something went wrong.');
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useDataFetching;
