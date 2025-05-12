// D:\client_CarPassion4\src\components\CarSearch.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import CarCard from '../components/CarCard';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown, ChevronUp, Filter, X, SlidersHorizontal, ArrowLeft } from 'lucide-react';

const CarSearch = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [totalCars, setTotalCars] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('price_asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const navigate = useNavigate();

  // Detect if we're on mobile
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // Get filters from URL on component mount
  useEffect(() => {
    const initialFilters = {};
    for (const [key, value] of searchParams.entries()) {
      initialFilters[key] = value;
    }
    setFilters(initialFilters);
    
    // Set initial sortBy value if it exists in URL
    if (initialFilters.sort) {
      setSortBy(initialFilters.sort);
    }
    
    // Set initial page if it exists in URL
    if (initialFilters.page) {
      setCurrentPage(Number(initialFilters.page));
    }
    
    fetchCars(initialFilters);
  }, [searchParams]);

  const fetchCars = async (filterParams = {}) => {
    try {
      setLoading(true);
      
      const queryParams = new URLSearchParams();
      Object.entries({...filterParams, sort: sortBy, page: currentPage}).forEach(([key, value]) => {
        if (value) {
          queryParams.append(key, value);
        }
      });
      
      // Add a small delay on mobile before API call to ensure network stability
      if (isMobile) {
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      const response = await api.get(`/cars?${queryParams.toString()}`);
      
      // Add defensive checks for response data
      if (response && response.data) {
        // Ensure cars is always an array even if API returns null/undefined
        const carsData = response.data.cars || [];
        setCars(Array.isArray(carsData) ? carsData : []);
        
        // Handle total count safely
        setTotalCars(response.data.total || carsData.length || 0);
        
        // Reset retry count on success
        setRetryCount(0);
      } else {
        console.error('Invalid API response format:', response);
        toast.error('Error loading cars: Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
      
      // Retry logic for mobile network issues (up to 3 attempts)
      if (retryCount < 2) {
        setRetryCount(count => count + 1);
        
        toast.info(`Network issue detected. Retrying... (${retryCount + 1}/3)`);
        
        // Wait a bit longer between retries
        setTimeout(() => fetchCars(filterParams), 1500);
        return;
      }
      
      toast.error('Failed to load cars. Please check your connection and try again.');
      
      // Set empty array to prevent further errors
      setCars([]);
      setTotalCars(0);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (newFilters) => {
    // Reset page when applying new filters
    setCurrentPage(1);
    
    // Update URL with new filters
    const updatedFilters = { ...newFilters, sort: sortBy, page: 1 };
    setSearchParams(updatedFilters);
    setFilters(newFilters);
    fetchCars(updatedFilters);
    
    // Close mobile filters if open
    setMobileFiltersOpen(false);
  };

  const handleSortChange = (e) => {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);
    const updatedFilters = { ...filters, sort: newSortBy };
    setSearchParams(updatedFilters);
    fetchCars(updatedFilters);
  };

  const clearFilters = () => {
    setFilters({});
    setSortBy('price_asc');
    setCurrentPage(1);
    setSearchParams({ sort: 'price_asc', page: 1 });
    fetchCars({ sort: 'price_asc', page: 1 });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const updatedFilters = { ...filters, sort: sortBy, page };
    setSearchParams(updatedFilters);
    fetchCars(updatedFilters);
    
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate pagination array
  const getPaginationArray = () => {
    const totalPages = Math.ceil(totalCars / 10); // Assuming 10 items per page
    
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    }
    
    if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  // Count active filters
  const activeFilterCount = Object.keys(filters).filter(key => 
    key !== 'sort' && key !== 'page' && filters[key]
  ).length;

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
      {/* Back Button */}
      <button 
        onClick={goBack} 
        className="flex items-center mb-4 text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back
      </button>

      {/* Search Header */}
      <div className="flex flex-wrap items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Find Your Car</h1>
          <p className="mt-1 text-sm text-gray-600">
            {totalCars} vehicles available
          </p>
        </div>
        
        <div className="flex items-center mt-2 space-x-2 sm:mt-0">
          {/* Sort Dropdown - Mobile Friendly */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="pl-3 pr-8 py-1.5 text-xs sm:text-sm border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="year_desc">Newest First</option>
              <option value="year_asc">Oldest First</option>
            </select>
          </div>
          
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center px-2 py-1.5 text-xs sm:text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <SlidersHorizontal className="w-3 h-3 mr-1 sm:w-4 sm:h-4" />
            Filter
            {activeFilterCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 text-xs font-semibold text-white bg-blue-800 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={() => setMobileFiltersOpen(false)}></div>
          
          <div className="relative flex flex-col w-full max-w-xs bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                className="p-2 text-gray-400 hover:text-gray-500"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto">
              <CompactCarFilters 
                onFilter={handleFilter} 
                initialFilters={filters}
              />
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Clear all
                </button>
                <button
                  onClick={() => handleFilter(filters)}
                  className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Pills */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.keys(filters).map(key => {
            if (key !== 'sort' && key !== 'page' && filters[key]) {
              let displayValue = filters[key];
              if (key === 'priceMax') {
                displayValue = `₹${Number(filters[key]).toLocaleString()}`;
              }
              
              return (
                <span key={key} className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full">
                  {key === 'make' ? 'Brand' : 
                   key === 'priceMax' ? 'Max Price' : 
                   key === 'yearMin' ? 'Year' : key}: {displayValue}
                  <button
                    type="button"
                    className="flex-shrink-0 ml-1 text-gray-400 hover:text-gray-500"
                    onClick={() => {
                      const newFilters = {...filters};
                      delete newFilters[key];
                      handleFilter(newFilters);
                    }}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              );
            }
            return null;
          })}
          {activeFilterCount > 1 && (
            <button
              onClick={clearFilters}
              className="px-2 py-1 text-xs font-medium text-blue-700 hover:text-blue-800"
            >
              Clear all
            </button>
          )}
        </div>
      )}

      {/* Car Listings */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-10 h-10 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : cars.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cars.map(car => (
            <div key={car._id || Math.random().toString()} className="overflow-hidden">
              <CarCard car={car} />
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 text-center bg-white rounded-lg shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No matching vehicles found</h3>
          <p className="mt-2 text-sm text-gray-600">
            Try adjusting your filters or check back later
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 mt-4 text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
          >
            Clear all filters
          </button>
        </div>
      )}
      
      {/* Pagination - Mobile Friendly */}
      {cars.length > 0 && totalCars > 10 && (
        <div className="flex items-center justify-center mt-6">
          <nav className="flex items-center space-x-1 sm:space-x-2" aria-label="Pagination">
            <button 
              className={`px-2 py-1 text-xs sm:text-sm border border-gray-300 rounded-md ${currentPage === 1 ? 'text-gray-400 bg-gray-50 cursor-not-allowed' : 'text-gray-700 bg-white hover:bg-gray-50'}`}
              onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            
            {/* Hide pagination numbers on smallest screens */}
            <div className="hidden sm:flex sm:items-center sm:space-x-1">
              {getPaginationArray().map((page, index) => (
                page === '...' ? (
                  <span key={`ellipsis-${index}`} className="text-gray-500">...</span>
                ) : (
                  <button
                    key={`page-${page}`}
                    className={`px-2 py-1 text-xs sm:text-sm border ${currentPage === page ? 'font-medium text-white bg-blue-600 border-blue-600' : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'} rounded-md`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                )
              ))}
            </div>
            
            {/* Show current page indicator on smallest screens */}
            <span className="text-xs text-gray-700 sm:hidden">
              {currentPage} / {Math.ceil(totalCars / 10)}
            </span>
            
            <button 
              className={`px-2 py-1 text-xs sm:text-sm border border-gray-300 rounded-md ${currentPage === Math.ceil(totalCars / 10) ? 'text-gray-400 bg-gray-50 cursor-not-allowed' : 'text-gray-700 bg-white hover:bg-gray-50'}`}
              onClick={() => currentPage < Math.ceil(totalCars / 10) && handlePageChange(currentPage + 1)}
              disabled={currentPage === Math.ceil(totalCars / 10)}
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

// CompactCarFilters component remains unchanged
const CompactCarFilters = ({ onFilter, initialFilters }) => {
  const [filterValues, setFilterValues] = useState({
    make: initialFilters.make || '',
    priceMax: initialFilters.priceMax || '',
    yearMin: initialFilters.yearMin || '',
  });

  // Update filter values when initialFilters change
  useEffect(() => {
    setFilterValues({
      make: initialFilters.make || '',
      priceMax: initialFilters.priceMax || '',
      yearMin: initialFilters.yearMin || '',
    });
  }, [initialFilters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterValues({
      ...filterValues,
      [name]: value,
    });
  };
  
  const handleSubmit = () => {
    // Remove empty values
    const filters = Object.fromEntries(
      Object.entries(filterValues).filter(([_, value]) => value !== '')
    );
    
    onFilter(filters);
  };

  // Input fields configuration
  const filters = [
    { 
      name: 'make', 
      label: 'Brand', 
      type: 'text', 
      placeholder: 'Enter brand name'
    },
    { 
      name: 'yearMin', 
      label: 'Min Year', 
      type: 'number', 
      placeholder: 'Enter year (e.g. 2020)'
    },
    { 
      name: 'priceMax', 
      label: 'Max Price (INR)', 
      type: 'number', 
      placeholder: 'Enter amount in ₹'
    },
  ];

  return (
    <div className="space-y-4">
      {filters.map((field) => (
        <div key={field.name}>
          <label 
            htmlFor={field.name} 
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            {field.label}
          </label>
          
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            value={filterValues[field.name]}
            onChange={handleChange}
            placeholder={field.placeholder}
            className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      ))}
      
      <button
        onClick={handleSubmit}
        className="w-full px-4 py-2 mt-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default CarSearch;