import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const useCars = (filters = {}) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const query = new URLSearchParams(filters).toString();
        const res = await axios.get(`/api/v1/cars?${query}`);
        setCars(res.data.data);
        setTotal(res.data.count);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch cars');
        toast.error(err.response?.data?.message || 'Failed to fetch cars');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [filters]);

  return { cars, loading, error, total };
};