// /src/pages/AuthPage.jsx

import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react'; // Un ícono para volver

function AuthPage() {
  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // Le decimos a Supabase a dónde redirigir al usuario DESPUÉS del login exitoso.
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4 relative">
      {/* Botón para volver al inicio */}
      <Link to="/" className="absolute top-4 left-4 text-gray-500 hover:text-gray-800">
        <ArrowLeft size={24} />
      </Link>

      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">ᚺabito</h1>
        <p className="text-lg mb-8 text-gray-600">Un solo clic para tomar el control.</p>

        <button 
          onClick={signInWithGoogle}
          className="bg-white text-gray-700 font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 flex items-center mx-auto border border-gray-200"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google icon" className="w-6 h-6 mr-4"/>
          Iniciar Sesión con Google
        </button>
      </div>
    </div>
  );
}

export default AuthPage;