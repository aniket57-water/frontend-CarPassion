import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";
import ImageUpload from "../../components/ImageUpload";

const AddCar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    color: "",
    fuelType: "",
    transmission: "Automatic",
    description: "",
    features: [],
    images: [],
    status: "available",
  });
  const [newFeature, setNewFeature] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.make ||
      !formData.model ||
      !formData.year ||
      !formData.price ||
      !formData.mileage ||
      !formData.color ||
      !formData.fuelType ||
      !formData.transmission ||
      !formData.description
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);

      // Convert string numbers to actual numbers
      const payload = {
        ...formData,
        year: Number(formData.year),
        price: Number(formData.price),
        mileage: Number(formData.mileage),
      };

      const response = await api.post("/cars", payload);

      toast.success("Car added successfully");
      navigate("/admin/cars");
    } catch (error) {
      console.error("Error adding car:", error);
      toast.error("Failed to add car");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Add New Car</h1>
        <p className="mt-2 text-sm text-gray-600">
          Fill in the details below to add a new car to your inventory
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded-lg shadow-md"
      >
        <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
          {/* Basic Information */}
          <div>
            <h2 className="mb-4 text-xl font-semibold">Basic Information</h2>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label
                  htmlFor="make"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
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
                <label
                  htmlFor="model"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
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
                <label
                  htmlFor="year"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
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
                <label
                  htmlFor="price"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Price (Rs) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  step="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="mileage"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Mileage (km) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="mileage"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="color"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
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
            <label
              htmlFor="fuelType"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
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
            <label
              htmlFor="transmission"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
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
          <label
            htmlFor="description"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
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
                <div
                  key={index}
                  className="flex items-center px-3 py-1 bg-gray-100 rounded-full"
                >
                  <span className="text-sm">{feature}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(index)}
                    className="ml-2 text-gray-500 hover:text-red-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
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
          <label
            htmlFor="status"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
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
            onClick={() => navigate("/admin/cars")}
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Car"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCar;
