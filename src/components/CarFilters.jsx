// D:\client_CarPassion4\src\components\CarFilters.jsx
import React, { useState } from 'react';

const CarFilters = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    minPrice: '',
    maxPrice: '',
    minYear: '',
    maxYear: '',
    transmission: '',
    fuelType: ''
  });
  
  const [expanded, setExpanded] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };
  
  const clearFilters = () => {
    setFilters({
      make: '',
      model: '',
      minPrice: '',
      maxPrice: '',
      minYear: '',
      maxYear: '',
      transmission: '',
      fuelType: ''
    });
    onFilter({});
  };
  
  return (
    <div className="p-4 mb-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-600 hover:text-blue-800 focus:outline-none"
        >
          {expanded ? 'Hide Filters' : 'Show All Filters'}
        </button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Basic filters always visible */}
          <div>
            <label htmlFor="make" className="block mb-1 text-sm font-medium text-gray-700">
              Make
            </label>
            <input
              type="text"
              id="make"
              name="make"
              value={filters.make}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Any make"
            />
          </div>
          
          <div>
            <label htmlFor="model" className="block mb-1 text-sm font-medium text-gray-700">
              Model
            </label>
            <input
              type="text"
              id="model"
              name="model"
              value={filters.model}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Any model"
            />
          </div>
          
          <div>
            <label htmlFor="minPrice" className="block mb-1 text-sm font-medium text-gray-700">
              Min Price
            </label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Min price"
              min="0"
            />
          </div>
          
          <div>
            <label htmlFor="maxPrice" className="block mb-1 text-sm font-medium text-gray-700">
              Max Price
            </label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Max price"
              min="0"
            />
          </div>
        </div>
        
        {/* Advanced filters (expandable) */}
        {expanded && (
          <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label htmlFor="minYear" className="block mb-1 text-sm font-medium text-gray-700">
                Min Year
              </label>
              <input
                type="number"
                id="minYear"
                name="minYear"
                value={filters.minYear}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Min year"
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>
            
            <div>
              <label htmlFor="maxYear" className="block mb-1 text-sm font-medium text-gray-700">
                Max Year
              </label>
              <input
                type="number"
                id="maxYear"
                name="maxYear"
                value={filters.maxYear}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Max year"
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>
            
            <div>
              <label htmlFor="transmission" className="block mb-1 text-sm font-medium text-gray-700">
                Transmission
              </label>
              <select
                id="transmission"
                name="transmission"
                value={filters.transmission}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Any transmission</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
                <option value="Semi-Automatic">Semi-Automatic</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="fuelType" className="block mb-1 text-sm font-medium text-gray-700">
                Fuel Type
              </label>
              <select
                id="fuelType"
                name="fuelType"
                value={filters.fuelType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Any fuel type</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Plug-in Hybrid">Plug-in Hybrid</option>
              </select>
            </div>
          </div>
        )}
        
        <div className="flex flex-col justify-end space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <button
            type="button"
            onClick={clearFilters}
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Clear Filters
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Apply Filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarFilters;