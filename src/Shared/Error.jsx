import React from "react";
import { Link } from "react-router";

const Error = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      
      {/* Error Code */}
      <h1 className="text-7xl font-extrabold text-red-500 mb-4">404</h1>

      {/* Message */}
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
        Page Not Found
      </h2>

      <p className="text-gray-600 text-center max-w-md mb-6">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <Link
          to="/"
          className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Go Home
        </Link>

        <button
          onClick={() => window.history.back()}
          className="px-6 py-2 rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-300 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Error;
