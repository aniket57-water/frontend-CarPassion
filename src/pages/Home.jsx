import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import CarCard from '../components/CarCard';
import CarFilters from '../components/CarFilters';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const { currentUser } = useAuth();
  const contactSectionRef = useRef(null);

  useEffect(() => {
    fetchCars();
  }, []);

  const scrollToContact = (e) => {
    e.preventDefault();
    contactSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchCars = async (filterParams = {}) => {
    try {
      setLoading(true);
      
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

  const clearFilters = () => {
    setFilters({});
    fetchCars({});
  };

  return (
    <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
      {/* Hero Section with Background Car Image */}
      <section className="relative mb-16 overflow-hidden text-white rounded-xl h-96">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div 
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: "url('/images/hero-car.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-indigo-900 opacity-60"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Discover Your Perfect Ride
            </h1>
            <p className="mb-8 text-lg text-blue-100 md:text-xl">
              Premium pre-owned vehicles with certified quality and unbeatable value
            </p>
            <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <a
                href="#inventory"
                className="px-8 py-3 text-lg font-semibold text-blue-900 transition-all duration-300 bg-white rounded-lg shadow-lg hover:bg-blue-50 hover:shadow-xl"
              >
                View Inventory
              </a>
              {!currentUser && (
                <Link
                  to="/admin/login"
                  className="px-8 py-3 text-lg font-semibold text-white transition-all duration-300 border-2 border-white rounded-lg hover:bg-white hover:text-blue-900"
                >
                  Dealer Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Car Filters */}
      <section className="mb-12">
        <CarFilters onFilter={handleFilter} />
      </section>

      {/* Car Listings */}
      <section id="inventory" className="mb-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Available Inventory
            </h2>
            <p className="mt-2 text-gray-600">
              {cars.length} vehicles matching your criteria
            </p>
          </div>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : cars.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cars.map(car => (
              <CarCard 
                key={car._id} 
                car={car}
                className="transition-all duration-300 hover:shadow-lg"
              />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-white rounded-lg shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-xl font-medium text-gray-900">No matching vehicles found</h3>
            <p className="mt-2 text-gray-600">
              Try adjusting your filters or check back later for new inventory
            </p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 mt-4 text-sm font-medium text-blue-600 transition-colors hover:text-blue-800"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>

      {/* Value Proposition */}
      <section className="p-8 mb-16 bg-gray-50 rounded-xl">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-6 text-3xl font-bold text-gray-900">
            Why Customers Choose Us
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="p-6 transition-all duration-300 bg-white rounded-lg shadow-sm hover:shadow-md">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Certified Quality</h3>
              <p className="text-gray-600">
                Every vehicle undergoes a 150-point inspection by our certified technicians
              </p>
            </div>
            <div className="p-6 transition-all duration-300 bg-white rounded-lg shadow-sm hover:shadow-md">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Best Price Guarantee</h3>
              <p className="text-gray-600">
                We'll match any competitor's price on identical vehicles
              </p>
            </div>
            <div className="p-6 transition-all duration-300 bg-white rounded-lg shadow-sm hover:shadow-md">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold">Flexible Financing</h3>
              <p className="text-gray-600">
                Tailored payment plans with competitive rates from our banking partners
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section / Call to Action */}
      <section ref={contactSectionRef} id="contact" className="relative p-8 overflow-hidden text-center text-white rounded-xl">
        <div 
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: "url('/images/contact-car.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-indigo-900 opacity-90"></div>
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="mb-4 text-3xl font-bold">
            Ready to Find Your Dream Car?
          </h2>
          <p className="mb-6 text-lg text-blue-100">
            Schedule a test drive or get a free valuation for your current vehicle
          </p>
          <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <a
              href="#contact"
              onClick={scrollToContact}
              className="px-8 py-3 text-lg font-semibold text-blue-900 transition-all duration-300 bg-white rounded-lg hover:bg-blue-50"
            >
              Contact Us
            </a>
            <a
              href="tel:+18005551234"
              className="px-8 py-3 text-lg font-semibold text-white transition-all duration-300 border-2 border-white rounded-lg hover:bg-white hover:text-blue-900"
            >
              Call Now
            </a>
          </div>
          

        </div>
      </section>
    </div>
  );
};

export default Home;