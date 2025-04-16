import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { toast } from 'react-toastify';
import { formatCurrency } from '../utils/format';

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  
  useEffect(() => {
    fetchCarDetails();
  }, [id]);
  
  const fetchCarDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/cars/${id}`);
      setCar(response.data.car);
      
      // Reset active image on new car load
      setActiveImage(0);
    } catch (error) {
      console.error('Error fetching car details:', error);
      toast.error('Car not found');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!car) {
    return (
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="p-6 text-center bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Car Not Found</h2>
          <p className="mb-6 text-gray-600">
            The car you're looking for doesn't exist or is no longer available.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 font-medium text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="overflow-hidden bg-white rounded-lg shadow-md">
        <div className="md:flex">
          {/* Image Gallery */}
          <div className="md:w-1/2">
            <div className="relative h-64 sm:h-80 md:h-96">
              {car.images && car.images.length > 0 ? (
                <img
                  src={car.images[activeImage].url}
                  alt={`${car.year} ${car.make} ${car.model}`}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-200">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
            </div>
            
            {car.images && car.images.length > 1 && (
              <div className="flex p-2 overflow-x-auto no-scrollbar">
                {car.images.map((image, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 cursor-pointer rounded-md overflow-hidden w-20 h-20 mr-2 border-2 ${
                      activeImage === index ? 'border-blue-500' : 'border-transparent'
                    }`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img
                      src={image.url}
                      alt={`${car.year} ${car.make} ${car.model} thumbnail ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Car Details */}
          <div className="p-6 md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-900">
              {car.year} {car.make} {car.model}
            </h1>
            
            <div className="mt-4 text-2xl font-bold text-blue-600">
              {formatCurrency(car.price)}
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <span className="block text-sm text-gray-500">Mileage</span>
                <span className="block font-medium">{car.mileage.toLocaleString()} km</span>
              </div>
              <div>
                <span className="block text-sm text-gray-500">Color</span>
                <span className="block font-medium">{car.color}</span>
              </div>
              <div>
                <span className="block text-sm text-gray-500">Fuel Type</span>
                <span className="block font-medium">{car.fuelType}</span>
              </div>
              <div>
                <span className="block text-sm text-gray-500">Transmission</span>
                <span className="block font-medium">{car.transmission}</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h2 className="mb-2 text-lg font-semibold">Description</h2>
              <p className="text-gray-700">{car.description}</p>
            </div>
            
            {car.features && car.features.length > 0 && (
              <div className="mt-6">
                <h2 className="mb-2 text-lg font-semibold">Features</h2>
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {car.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="flex flex-col mt-8 space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
              <a
                href="tel:+1234567890"
                className="px-6 py-3 font-medium text-center text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Call for Inquiry
              </a>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 font-medium text-gray-800 transition-colors bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Back to Listings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;