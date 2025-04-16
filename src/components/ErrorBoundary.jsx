import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
          <div className="w-full max-w-md text-center">
            <h1 className="mb-4 text-5xl font-extrabold text-red-600">Error</h1>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Something went wrong</h2>
            <p className="mb-6 text-lg text-gray-600">
              We're sorry, but an unexpected error occurred. Please try again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;