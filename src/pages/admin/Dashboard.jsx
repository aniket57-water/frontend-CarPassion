// D:\client_CarPassion4\src\pages\admin\Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCars: 0,
    availableCars: 0,
    soldCars: 0,
    reservedCars: 0
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchStats();
  }, []);
  
  const fetchStats = async () => {
    try {
      setLoading(true);
      
      // Get all cars to calculate stats
      const response = await api.get('/cars');
      const cars = response.data.cars;
      
      // Calculate stats
      const totalCars = cars.length;
      const availableCars = cars.filter(car => car.status === 'available').length;
      const soldCars = cars.filter(car => car.status === 'sold').length;
      const reservedCars = cars.filter(car => car.status === 'reserved').length;
      
      setStats({
        totalCars,
        availableCars,
        soldCars,
        reservedCars
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8 bg-gray-50">
      <div className="flex flex-col mb-10 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Admin Dashboard</h1>
        <Link
          to="/admin/cars/add"
          className="inline-flex items-center px-5 py-2.5 mt-4 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg shadow-md md:mt-0 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:-translate-y-1"
        >
          <svg className="w-5 h-5 mr-2 -ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Car
        </Link>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-16 h-16 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-6 mb-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-lg rounded-xl hover:shadow-xl hover:border-blue-100">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="text-blue-600 w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-sm font-semibold tracking-wider text-gray-500 uppercase">Total Cars</h2>
                  <p className="text-3xl font-bold text-gray-800">{stats.totalCars}</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-lg rounded-xl hover:shadow-xl hover:border-green-100">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600 w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-sm font-semibold tracking-wider text-gray-500 uppercase">Available</h2>
                  <p className="text-3xl font-bold text-gray-800">{stats.availableCars}</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-lg rounded-xl hover:shadow-xl hover:border-yellow-100">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="text-yellow-600 w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-sm font-semibold tracking-wider text-gray-500 uppercase">Reserved</h2>
                  <p className="text-3xl font-bold text-gray-800">{stats.reservedCars}</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-lg rounded-xl hover:shadow-xl hover:border-red-100">
              <div className="flex items-center">
                <div className="p-3 bg-red-100 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="text-red-600 w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h2 className="text-sm font-semibold tracking-wider text-gray-500 uppercase">Sold</h2>
                  <p className="text-3xl font-bold text-gray-800">{stats.soldCars}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="p-8 mb-8 overflow-hidden bg-white border border-gray-100 shadow-lg rounded-xl">
            <h2 className="mb-6 text-2xl font-semibold text-gray-800">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Link
                to="/admin/cars"
                className="flex items-center p-5 transition-all duration-300 border border-gray-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 hover:shadow-md group"
              >
                <div className="p-3 transition-colors duration-300 bg-blue-100 rounded-full group-hover:bg-blue-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-800 transition-colors duration-300 group-hover:text-blue-700">Manage Inventory</h3>
                  <p className="text-sm text-gray-500">View and manage all cars</p>
                </div>
                <div className="ml-auto transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
              
              <Link
                to="/admin/cars/add"
                className="flex items-center p-5 transition-all duration-300 border border-gray-200 rounded-xl hover:bg-green-50 hover:border-green-200 hover:shadow-md group"
              >
                <div className="p-3 transition-colors duration-300 bg-green-100 rounded-full group-hover:bg-green-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-800 transition-colors duration-300 group-hover:text-green-700">Add New Car</h3>
                  <p className="text-sm text-gray-500">Create a new listing</p>
                </div>
                <div className="ml-auto transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
              
              <Link
                to="/admin/cars?status=sold"
                className="flex items-center p-5 transition-all duration-300 border border-gray-200 rounded-xl hover:bg-purple-50 hover:border-purple-200 hover:shadow-md group"
              >
                <div className="p-3 transition-colors duration-300 bg-purple-100 rounded-full group-hover:bg-purple-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-800 transition-colors duration-300 group-hover:text-purple-700">View Sold Cars</h3>
                  <p className="text-sm text-gray-500">See completed sales</p>
                </div>
                <div className="ml-auto transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;