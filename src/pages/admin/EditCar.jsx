// D:\client_CarPassion4\src\pages\admin\EditCar.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-toastify';
import ImageUpload from '../../components/ImageUpload';

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    kilometers_driven: '',
    color: '',
    fuelType: '',
    transmission: 'Automatic',
    description: '',
    features: [],
    images: [],
    status: 'available'
  });
  const [newFeature, setNewFeature] = useState('');
  
  useEffect(() => {
    fetchCarDetails();
  }, [id]);
  
  const fetchCarDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/cars/${id}`);
      setFormData({
        make: response.data.car.make,
        model: response.data.car.model,
        year: response.data.car.year,
        price: response.data.car.price,
        kilometers_driven: response.data.car.kilometers_driven,
        color: response.data.car.color,
        fuelType: response.data.car.fuelType,
        transmission: response.data.car.transmission,
        description: response.data.car.description,
        features: response.data.car.features || [],
        images: response.data.car.images || [],
        status: response.data.car.status
      });
    } catch (error) {
      console.error('Error fetching car details:', error);
      toast.error('Failed to load car details');
      navigate('/admin/cars');
    } finally {
      setLoading(false);
    }
  };
  
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({ ...prev, [name]: value }));
  // };

  const handleChange = (e) => {
  const { name, value, type } = e.target;
  setFormData({
    ...formData,
    [name]: type === "number" ? Number(value) : value,
  });
};
  
  const handleAddFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };
  
  const handleRemoveFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.make || !formData.model || !formData.year || !formData.price || 
        !formData.kilometers_driven || !formData.color || !formData.fuelType || 
        !formData.transmission || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    try {
      setLoading(true);
      
      // Convert string numbers to actual numbers
      const payload = {
        ...formData,
        year: Number(formData.year),
        price: Number(formData.price),
        kilometers_driven: Number(formData.kilometers_driven)
      };
      
      const response = await api.put(`/cars/${id}`, payload);
      
      toast.success('Car updated successfully');
      navigate('/admin/cars');
    } catch (error) {
      console.error('Error updating car:', error);
      toast.error('Failed to update car');
    } finally {
      setLoading(false);
    }
  };
  
  if (loading && !formData.make) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Car</h1>
        <p className="mt-2 text-sm text-gray-600">
          Update the details of this car listing
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md">
        <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
          {/* Basic Information */}
          <div>
            <h2 className="mb-4 text-xl font-semibold">Basic Information</h2>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="make" className="block mb-1 text-sm font-medium text-gray-700">
                  Make <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="make"
                  name="make"
                  value={formData.make}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="model" className="block mb-1 text-sm font-medium text-gray-700">
                  Model <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="year" className="block mb-1 text-sm font-medium text-gray-700">
                  Year <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Pricing */}
          <div>
            <h2 className="mb-4 text-xl font-semibold">Pricing & Details</h2>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="price" className="block mb-1 text-sm font-medium text-gray-700">
                  Price (Rs) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="kilometers_driven" className="block mb-1 text-sm font-medium text-gray-700">
                  Kilometers Driven (km) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="kilometers_driven"
                  name="kilometers_driven"
                  min={0}
                  step={1000}
                  value={formData.kilometers_driven}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="color" className="block mb-1 text-sm font-medium text-gray-700">
                  Color <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Technical Details */}
        <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
          <div>
            <label htmlFor="fuelType" className="block mb-1 text-sm font-medium text-gray-700">
              Fuel Type <span className="text-red-500">*</span>
            </label>
            <select
              id="fuelType"
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Plug-in Hybrid">Plug-in Hybrid</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="transmission" className="block mb-1 text-sm font-medium text-gray-700">
              Transmission <span className="text-red-500">*</span>
            </label>
            <select
              id="transmission"
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
            </select>
          </div>
        </div>
        
        {/* Description */}
        <div className="mb-6">
          <label htmlFor="description" className="block mb-1 text-sm font-medium text-gray-700">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        {/* Features */}
        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Features
          </label>
          <div className="flex mb-2">
            <input
              type="text"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              placeholder="Add a feature (e.g. Sunroof)"
              className="flex-1 px-3 py-2 border border-gray-300 shadow-sm rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={handleAddFeature}
              className="px-4 py-2 text-white bg-blue-600 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add
            </button>
          </div>
          
          {formData.features.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center px-3 py-1 bg-gray-100 rounded-full">
                  <span className="text-sm">{feature}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(index)}
                    className="ml-2 text-gray-500 hover:text-red-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Image Upload */}
        <ImageUpload 
          images={formData.images} 
          setImages={(images) => setFormData({ ...formData, images })}
        />
        
        {/* Status */}
        <div className="mb-6">
          <label htmlFor="status" className="block mb-1 text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="available">Available</option>
            <option value="reserved">Reserved</option>
            <option value="sold">Sold</option>
          </select>
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/cars')}
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCar;