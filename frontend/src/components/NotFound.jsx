import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
            <h1 className="text-6xl font-bold text-red-600">404</h1>
            <p className="text-2xl mt-4 text-gray-800">Oops! Page not found</p>
            <p className="text-gray-600 mt-2">The page you’re looking for doesn’t exist.</p>
            <Link
                to="/"
                className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
                Go Home
            </Link>
        </div>
    );
};

export default NotFound;