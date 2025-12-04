import { Outlet } from 'react-router-dom';
import PageHeader from './PageHeader';
import Navbar from './Navbar';

function AppLayout() {
  return (
    // 1. CONTENEDOR PRINCIPAL:
    // Cambiamos 'min-h-screen' por 'h-screen' y 'overflow-hidden'.
    // Esto bloquea la página entera para que NO se mueva el navegador, solo la app.
    <div className="bg-gray-100 h-screen w-screen overflow-hidden flex justify-center">
      
      {/* 2. EL "CELULAR":
          'h-full' toma exactamente el 100% de la altura disponible.
          'relative' ayuda a posicionar elementos flotantes si los hubiera.
      */}
      <div className="w-full max-w-md h-full flex flex-col bg-zinc-100 shadow-lg relative">
        
        {/* Header: 'flex-none' evita que se aplaste o estire */}
        <div className="flex-none z-10">
            <PageHeader title="ᚺabito-app" />
        </div>
        
        {/* 3. ZONA DE SCROLL (Main):
            'flex-grow': Ocupa todo el espacio sobrante entre header y navbar.
            'overflow-y-auto': AQUÍ es donde ocurre el scroll.
            'pb-24': Agregamos padding extra abajo para que el último botón no quede tapado por la Navbar.
        */}
        <main className="flex-grow overflow-y-auto p-4 scroll-smooth">
          <Outlet />
        </main>
        
        {/* Navbar: Fija al fondo visualmente gracias al flex container */}
        <div className="flex-none z-10 bg-white">
            <Navbar />
        </div>

      </div>
    </div>
  );
}

export default AppLayout;