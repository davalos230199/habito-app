// /src/pages/LandingPage.jsx

import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen flex flex-col justify-center items-center p-4 text-center">
      <div className="max-w-md w-full">
        {/* Logo y Nombre */}
        <h1 className="text-6xl font-bold text-gray-900">
          ᚺabito
        </h1>

        {/* Tagline */}
        <p className="mt-4 text-xl text-gray-600">
          El sistema operativo de tu mejor versión.
        </p>

        {/* Descripción Primitiva/Filosófica */}
        <p className="mt-6 text-md">
          Analiza tu presente para construir tu futuro. Tomamos el control de tus tres pilares: tu Mente como <span className="font-semibold">Herramienta</span>, tu Emoción como <span className="font-semibold">Motor</span> y tu Cuerpo como <span className="font-semibold">Vehículo</span>.
        </p>

        {/* Call to Action (Botón) */}
        <Link
          to="/login"
          className="mt-10 inline-block bg-green-500 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-green-600 transition duration-300 shadow-lg"
        >
          Comenzar
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;