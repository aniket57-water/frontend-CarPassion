import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '../services/api';

const ImageUpload = ({ images, setImages }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    if (selectedFiles.length === 0) return;
    
    // Validate files
    const validFiles = selectedFiles.filter(file => {
      const isImage = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
      
      if (!isImage) {
        toast.error(`${file.name} is not an image file`);
      }
      if (!isValidSize) {
        toast.error(`${file.name} exceeds the 5MB size limit`);
      }
      
      return isImage && isValidSize;
    });
    
    if (validFiles.length === 0) return;
    
    // Prepare form data
    const formData = new FormData();
    validFiles.forEach(file => {
      formData.append('images', file);
    });
    
    try {
      setUploading(true);
      
      const response = await api.post('/upload/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Add new images to existing ones
      setImages([...images, ...response.data.images]);
      toast.success('Images uploaded successfully');
    } catch (error) {
      console.error('Image upload error:', error);
      toast.error('Failed to upload images');
    } finally {
      setUploading(false);
      e.target.value = null; // Reset file input
    }
  };
  
  const removeImage = async (index) => {
    const imageToRemove = images[index];
    
    try {
      if (imageToRemove.public_id) {
        await api.delete('/upload/image', {
          data: { public_id: imageToRemove.public_id }
        });
      }
      
      // Remove from state
      setImages(images.filter((_, i) => i !== index));
      toast.success('Image removed');
    } catch (error) {
      console.error('Image removal error:', error);
      toast.error('Failed to remove image');
    }
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-gray-700">
          Car Images
        </label>
        <div className="text-xs text-gray-500">
          Max 10 images, 5MB each
        </div>
      </div>
      
      {/* Image preview */}
      <div className="grid grid-cols-2 gap-2 mb-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <img
              src={image.url}
              alt={`Car ${index + 1}`}
              className="object-cover w-full h-24 rounded-md"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute p-1 text-white transition-opacity bg-red-500 rounded-full opacity-0 top-1 right-1 group-hover:opacity-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
        
        {/* Upload button */}
        {images.length < 10 && (
          <label className="flex flex-col items-center justify-center h-24 transition-colors border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-blue-500">
            {uploading ? (
              <div className="w-6 h-6 border-t-2 border-blue-500 rounded-full animate-spin"></div>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span className="mt-1 text-xs text-gray-500">Add Image</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={uploading || images.length >= 10}
                />
              </>
            )}
          </label>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;