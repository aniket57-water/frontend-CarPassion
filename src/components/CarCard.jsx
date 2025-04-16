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
  
  return (
    <div className="overflow-hidden transition-all bg-white rounded-lg shadow-lg hover:shadow-xl card-shadow">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        {car.images && car.images.length > 0 ? (
          <img
            src={car.images[0].url}
            alt={`${car.year} ${car.make} ${car.model}`}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-200">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
        
        {/* Status badge for admin */}
        {isAdmin && (
          <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(car.status)}`}>
            {car.status.charAt(0).toUpperCase() + car.status.slice(1)}
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {car.year} {car.make} {car.model}
        </h3>
        
        <div className="mt-2 text-lg font-bold text-blue-600">
          {formatCurrency(car.price)}
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-600">
          <div>
            <span className="font-medium">Mileage:</span> {car.mileage.toLocaleString()} km
          </div>
          <div>
            <span className="font-medium">Color:</span> {car.color}
          </div>
          <div>
            <span className="font-medium">Fuel:</span> {car.fuelType}
          </div>
          <div>
            <span className="font-medium">Transmission:</span> {car.transmission}
          </div>
        </div>
        
        <div className="mt-4">
          <Link
            to={isAdmin ? `/admin/cars/${car._id}/edit` : `/cars/${car._id}`}
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