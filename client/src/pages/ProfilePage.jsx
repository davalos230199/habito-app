import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle, LogIn, Settings, LogOut, Trash2, ChevronRight, Github } from 'lucide-react';

const ProfilePage = () => {
  const navigate = useNavigate();

  // Función para salir a la Landing
  const handleExit = () => {
    navigate('/');
  };

  // Función para reiniciar todo (útil para desarrollo)
  const handleReset = () => {
    if (window.confirm("¿Estás seguro? Esto borrará todos tus hábitos guardados en este dispositivo.")) {
        localStorage.clear(); // Borra el 'localStore'
        window.location.href = '/'; // Recarga forzada a la landing
    }
  };

  // Componente reutilizable para las opciones del menú
  const MenuOption = ({ icon: Icon, title, subtitle, onClick, danger }) => (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl mb-3 shadow-sm hover:shadow-md transition-all active:scale-98 group
      ${danger ? 'border-red-100' : ''}`}
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-full transition-colors ${danger ? 'bg-red-50 text-red-500' : 'bg-stone-50 text-stone-600 group-hover:bg-stone-100'}`}>
          <Icon size={20} strokeWidth={2} />
        </div>
        <div className="text-left">
          <h4 className={`font-semibold text-sm ${danger ? 'text-red-600' : 'text-stone-800'}`}>{title}</h4>
          {subtitle && <p className="text-[10px] text-stone-400">{subtitle}</p>}
        </div>
      </div>
      {!danger && <ChevronRight size={18} className="text-stone-300" />}
    </button>
  );

  return (
    <div className="p-6 space-y-8 pb-32"> {/* pb-32 para que no se corte al final */}
      
      {/* 1. ENCABEZADO DEL PERFIL */}
      <div className="flex flex-col items-center pt-6">
        <div className="w-24 h-24 bg-gradient-to-tr from-stone-100 to-stone-200 rounded-full flex items-center justify-center mb-4 shadow-inner border-4 border-white">
            <UserCircle size={56} className="text-stone-400" />
        </div>
        <h2 className="text-xl font-bold text-stone-800">Modo Invitado</h2>
        <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider rounded-full mt-2">
            Local Storage
        </span>
      </div>

      {/* 2. CTA: INICIAR SESIÓN (Tarjeta Destacada) */}
      <div className="bg-stone-900 rounded-2xl p-5 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
            <h3 className="font-bold text-lg mb-1">Guarda tu progreso</h3>
            <p className="text-stone-400 text-xs mb-4 max-w-[85%]">
              Sincroniza tus hábitos en la nube y accede desde cualquier dispositivo.
            </p>
            <button 
                onClick={() => navigate('/login')}
                className="w-full bg-white text-stone-900 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-stone-100 transition-colors"
            >
                <LogIn size={18} />
                Crear Cuenta / Entrar
            </button>
        </div>
        {/* Decoración abstracta */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-stone-800 rounded-full blur-2xl -mr-10 -mt-10 opacity-50"></div>
      </div>

      {/* 3. MENÚ DE OPCIONES */}
      <div>
        <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4 ml-1">Aplicación</h3>
        
        <MenuOption 
            icon={Settings} 
            title="Configuración" 
            subtitle="Notificaciones, tema y más"
            onClick={() => {}} // Placeholder
        />

        <MenuOption 
            icon={LogOut} 
            title="Volver al Inicio" 
            subtitle="Salir a la pantalla de bienvenida"
            onClick={handleExit} 
        />
        
        <div className="mt-8">
            <h3 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-4 ml-1">Zona de Desarrollo</h3>
            <MenuOption 
                icon={Trash2} 
                title="Resetear App" 
                subtitle="Borra todos los datos y empieza de cero"
                danger={true}
                onClick={handleReset} 
            />
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center">
        <p className="text-[10px] text-stone-300 flex items-center justify-center gap-1">
            Habito App v0.1.0 <span className="w-1 h-1 bg-stone-300 rounded-full"></span> Beta
        </p>
      </div>

    </div>
  );
};

export default ProfilePage;