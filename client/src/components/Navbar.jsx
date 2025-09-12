// /src/components/Navbar.jsx

import { Home, Calendar, User } from 'lucide-react'; // Icons from a library we installed

function Navbar() {
  return (
    <nav className="bg-white border-t border-gray-200 flex justify-around p-2">
      <button className="flex flex-col items-center text-green-500">
        <Home size={24} />
        <span className="text-xs mt-1">Inicio</span>
      </button>
      <button className="flex flex-col items-center text-gray-400">
        <Calendar size={24} />
        <span className="text-xs mt-1">Plan</span>
      </button>
      <button className="flex flex-col items-center text-gray-400">
        <User size={24} />
        <span className="text-xs mt-1">Perfil</span>
      </button>
    </nav>
  );
}

export default Navbar;