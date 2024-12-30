import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mt-4">Página no encontrada</h2>
        <p className="text-gray-500 mt-2">Lo sentimos, no pudimos encontrar la página que buscas.</p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <HomeIcon size={20} />
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};