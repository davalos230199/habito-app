import { NavLink } from 'react-router-dom';
import { Home, Calendar, User } from 'lucide-react';

function Navbar() {
  // Esta función decide el color: Si es la página actual -> Verde, si no -> Gris
  const linkClass = ({ isActive }) => 
    `flex flex-col items-center justify-center w-full h-full transition-colors ${
      isActive ? 'text-green-600 font-medium' : 'text-gray-400 hover:text-gray-600'
    }`;

  return (
    <nav className="bg-white border-t border-gray-100 flex justify-around items-center h-16 pb-safe">
      
      {/* Botón Inicio */}
      <NavLink to="/home" className={linkClass}>
        <Home size={24} strokeWidth={2} />
        <span className="text-[10px] mt-1 tracking-wide">Inicio</span>
      </NavLink>

      {/* Botón Plan (A futuro) */}
      <NavLink to="/plan" className={linkClass}>
        <Calendar size={24} strokeWidth={2} />
        <span className="text-[10px] mt-1 tracking-wide">Plan</span>
      </NavLink>

      {/* Botón Perfil (Aquí vivirá el Login) */}
      <NavLink to="/profile" className={linkClass}>
        <User size={24} strokeWidth={2} />
        <span className="text-[10px] mt-1 tracking-wide">Perfil</span>
      </NavLink>

    </nav>
  );
}

export default Navbar;