// D:\client_CarPassion4\src\components\CarCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/format';

const CarCard = ({ car, isAdmin = false }) => {
  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'sold':
        return 'bg-red-100 text-red-800';
      case 'reserved':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Add safe checks for all car properties
  const hasImages = car && car.images && Array.isArray(car.images) && car.images.length > 0;
  const imageUrl = hasImages && car.images[0].url ? car.images[0].url : '';
  
  // Safe car properties with fallbacks
  const carYear = car && car.year ? car.year : '';
  const carMake = car && car.make ? car.make : '';
  const carModel = car && car.model ? car.model : '';
  const carPrice = car && car.price ? car.price : 0;
  const carKms = car && car.kilometers_driven ? car.kilometers_driven : 0;
  const carColor = car && car.color ? car.color : 'N/A';
  const carFuelType = car && car.fuelType ? car.fuelType : 'N/A';
  const carTransmission = car && car.transmission ? car.transmission : 'N/A';
  const carStatus = car && car.status ? car.status : 'unknown';
  const carId = car && car._id ? car._id : '';
  
  if (!car) {
    return <div className="p-4 text-center">Error loading car data</div>;
  }
  
  return (
    <div className="overflow-hidden transition-all bg-white rounded-lg shadow-lg hover:shadow-xl card-shadow">
      {/* Image with error handling */}
      <div className="relative h-48 overflow-hidden">
        {hasImages ? (
          <img
            src={imageUrl}
            alt={`${carYear} ${carMake} ${carModel}`}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
            }}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-200">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
        
        {/* Status badge for admin */}
        {isAdmin && (
          <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(carStatus)}`}>
            {carStatus.charAt(0).toUpperCase() + carStatus.slice(1)}
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {carYear} {carMake} {carModel}
        </h3>
        
        <div className="mt-2 text-lg font-bold text-blue-600">
          {formatCurrency(carPrice)}
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-600">
          <div>
            <span className="font-medium">Kilometers Driven:</span> {carKms.toLocaleString()} km
          </div>
          <div>
            <span className="font-medium">Color:</span> {carColor}
          </div>
          <div>
            <span className="font-medium">Fuel:</span> {carFuelType}
          </div>
          <div>
            <span className="font-medium">Transmission:</span> {carTransmission}
          </div>
        </div>
        
        <div className="mt-4">
          <Link
            to={isAdmin ? `/admin/cars/${carId}/edit` : `/cars/${carId}`}
            className="block w-full px-4 py-2 font-medium text-center text-white transition-colors bg-blue-600 rounded hover:bg-blue-700"
          >
            {isAdmin ? 'Edit Car' : 'View Details'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;