// D:\client_CarPassion4\src\pages\Home.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import CarCard from "../components/CarCard";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";
import { Menu, X } from "lucide-react";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser } = useAuth();
  const contactSectionRef = useRef(null);

  useEffect(() => {
    fetchTopCars();
  }, []);

  const scrollToContact = (e) => {
    e.preventDefault();
    contactSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const fetchTopCars = async () => {
    try {
      setLoading(true);
      const response = await api.get('/cars?limit=5');
      setCars(response.data.cars);
    } catch (error) {
      console.error("Error fetching top cars:", error);
      toast.error("Failed to load featured cars");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Mobile Hamburger Menu */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-white shadow-md md:hidden">
        <div className="text-xl font-bold text-blue-900">AutoDealer</div>
        <button 
          onClick={toggleMobileMenu}
          className="p-2 text-gray-700 rounded-md focus:outline-none"
        >
          {mobileMenuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 pt-16 bg-white md:hidden">
          <div className="flex flex-col items-center py-4 space-y-4">
            <Link 
              to="/" 
              className="text-lg font-medium text-blue-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/search" 
              className="text-lg font-medium text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Search Cars
            </Link>
            <a 
              href="#featured" 
              className="text-lg font-medium text-gray-700"
              onClick={() => {
                document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });
                setMobileMenuOpen(false);
              }}
            >
              Featured Cars
            </a>
            <a 
              href="#contact" 
              className="text-lg font-medium text-gray-700"
              onClick={scrollToContact}
            >
              Contact Us
            </a>
            {!currentUser && (
              <Link 
                to="/admin/login" 
                className="px-6 py-2 text-lg font-medium text-white bg-blue-600 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dealer Login
              </Link>
            )}
          </div>
        </div>
      )}

      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8 mt-14 md:mt-0">
        {/* Hero Section with Background Car Image */}
        <section className="relative mb-8 overflow-hidden text-white rounded-xl h-72 md:h-96">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage: "url('/images/hero-car.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-indigo-900 opacity-60"></div>
          <div className="relative z-10 flex items-center justify-center h-full px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="mb-4 text-3xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Discover Your Perfect Ride
              </h1>
              <p className="mb-6 text-base text-blue-100 md:text-xl">
                Premium pre-owned vehicles with certified quality
              </p>
              <div className="flex flex-col justify-center space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                <a
                  href="#featured"
                  className="px-6 py-2 text-base font-semibold text-blue-900 transition-all duration-300 bg-white rounded-lg shadow-md hover:bg-blue-50 hover:shadow-lg md:text-lg md:px-8 md:py-3"
                >
                  Featured Cars
                </a>
                {!currentUser && (
                  <Link
                    to="/admin/login"
                    className="px-6 py-2 text-base font-semibold text-white transition-all duration-300 border-2 border-white rounded-lg hover:bg-white hover:text-blue-900 md:text-lg md:px-8 md:py-3"
                  >
                    Dealer Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Cars Section */}
        <section id="featured" className="mb-12">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                Featured Vehicles
              </h2>
              <p className="mt-1 text-sm text-gray-600 md:text-base">
                Our top picks just for you
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-10 h-10 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
            </div>
          ) : cars.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cars.map((car) => (
                <CarCard
                  key={car._id}
                  car={car}
                  className="transition-all duration-300 hover:shadow-lg"
                />
              ))}
            </div>
          ) : (
            <div className="p-6 text-center bg-white rounded-lg shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 mx-auto text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-3 text-lg font-medium text-gray-900 md:text-xl">
                No vehicles available
              </h3>
              <p className="mt-2 text-sm text-gray-600 md:text-base">
                Please check back later for new inventory
              </p>
            </div>
          )}

          <div className="flex justify-center mt-8">
            <Link
              to="/search"
              className="px-6 py-2 text-base font-semibold text-white transition-all duration-300 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg md:text-lg md:px-8 md:py-3"
            >
              View More Cars
            </Link>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="p-6 mb-12 bg-gray-50 rounded-xl md:p-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
              Why Choose Us
            </h2>
            <div className="grid gap-4 md:grid-cols-3 md:gap-6">
              <div className="p-4 transition-all duration-300 bg-white rounded-lg shadow-sm hover:shadow-md md:p-6">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full md:w-16 md:h-16 md:mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-blue-600 md:w-8 md:h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="mb-1 text-lg font-semibold md:text-xl md:mb-2">Certified Quality</h3>
                <p className="text-sm text-gray-600 md:text-base">
                  Every vehicle undergoes a thorough inspection
                </p>
              </div>
              <div className="p-4 transition-all duration-300 bg-white rounded-lg shadow-sm hover:shadow-md md:p-6">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full md:w-16 md:h-16 md:mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-blue-600 md:w-8 md:h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="mb-1 text-lg font-semibold md:text-xl md:mb-2">
                  Best Price Guarantee
                </h3>
                <p className="text-sm text-gray-600 md:text-base">
                  We'll match any competitor's price
                </p>
              </div>
              <div className="p-4 transition-all duration-300 bg-white rounded-lg shadow-sm hover:shadow-md md:p-6">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full md:w-16 md:h-16 md:mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-blue-600 md:w-8 md:h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
                <h3 className="mb-1 text-lg font-semibold md:text-xl md:mb-2">Flexible Financing</h3>
                <p className="text-sm text-gray-600 md:text-base">
                  Tailored payment plans with competitive rates
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section / Call to Action */}
        <section
          ref={contactSectionRef}
          id="contact"
          className="relative p-6 overflow-hidden text-center text-white rounded-xl md:p-8"
        >
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage: "url('/images/contact-car.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-indigo-900 opacity-90"></div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="mb-3 text-2xl font-bold md:text-3xl md:mb-4">
              Ready to Find Your Dream Car?
            </h2>
            <p className="mb-4 text-sm text-blue-100 md:text-lg md:mb-6">
              Schedule a test drive or get a free valuation
            </p>
            <div className="flex flex-col justify-center space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <a
                href="#contact"
                onClick={scrollToContact}
                className="px-6 py-2 text-base font-semibold text-blue-900 transition-all duration-300 bg-white rounded-lg hover:bg-blue-50 md:text-lg md:px-8 md:py-3"
              >
                Contact Us
              </a>
              <a
                href="tel:+18005551234"
                className="px-6 py-2 text-base font-semibold text-white transition-all duration-300 border-2 border-white rounded-lg hover:bg-white hover:text-blue-900 md:text-lg md:px-8 md:py-3"
              >
                Call Now
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;