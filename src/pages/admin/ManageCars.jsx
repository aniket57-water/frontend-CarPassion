// D:\client_CarPassion4\src\pages\admin\ManageCars.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-toastify';
import CarCard from '../../components/CarCard';
import CarFilters from '../../components/CarFilters';

const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  
  useEffect(() => {
    fetchCars();
  }, []);
  
  const fetchCars = async (filterParams = {}) => {
    try {
      setLoading(true);
      
      // Build query string from filters
      const queryParams = new URLSearchParams();
      Object.entries(filterParams).forEach(([key, value]) => {
        if (value) {
          queryParams.append(key, value);
        }
      });
      
      const response = await api.get(`/cars?${queryParams.toString()}`);
      setCars(response.data.cars);
    } catch (error) {
      console.error('Error fetching cars:', error);
      toast.error('Failed to load cars');
    } finally {
      setLoading(false);
    }
  };
  
  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    fetchCars(newFilters);
  };
  
  const handleStatusChange = async (carId, newStatus) => {
    try {
      await api.patch(`/cars/${carId}/status`, { status: newStatus });
      toast.success(`Car marked as ${newStatus}`);
      fetchCars(filters); // Refresh the list
    } catch (error) {
      console.error('Error updating car status:', error);
      toast.error('Failed to update car status');
    }
  };
  
  const handleDelete = async (carId) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        await api.delete(`/cars/${carId}`);
        toast.success('Car deleted successfully');
        fetchCars(filters); // Refresh the list
      } catch (error) {
        console.error('Error deleting car:', error);
        toast.error('Failed to delete car');
      }
    }
  };
  
  return (
    <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="flex flex-col mb-8 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Manage Inventory</h1>
        <Link
          to="/admin/cars/add"
          className="inline-flex items-center px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm md:mt-0 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg className="w-5 h-5 mr-2 -ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Car
        </Link>
      </div>
      
      <CarFilters onFilter={handleFilter} isAdmin />
      
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : cars.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cars.map(car => (
            <div key={car._id} className="relative">
              <CarCard car={car} isAdmin />
              
              {/* Admin actions */}
              <div className="flex flex-col mt-2 space-y-2">
                <select
                  value={car.status}
                  onChange={(e) => handleStatusChange(car._id, e.target.value)}
                  className="block w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="available">Available</option>
                  <option value="reserved">Reserved</option>
                  <option value="sold">Sold</option>
                </select>
                
                <div className="flex space-x-2">
                  <Link
                    to={`/admin/cars/${car._id}/edit`}
                    className="flex-1 px-3 py-1 text-sm text-center text-white transition-colors bg-yellow-500 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(car._id)}
                    className="flex-1 px-3 py-1 text-sm text-white transition-colors bg-red-500 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 text-center bg-white rounded-lg shadow-md">
          <p className="text-lg text-gray-600">
            No cars found with your current filters. Please try different filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default ManageCars;