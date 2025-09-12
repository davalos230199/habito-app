// /src/components/AppLayout.jsx

import { Outlet } from 'react-router-dom';
import PageHeader from './PageHeader';
import Navbar from './Navbar';

function AppLayout() {
  return (
    // Main container with a light gray background
    <div className="bg-gray-100 min-h-screen flex justify-center">
      
      {/* Mobile-first container with a max-width, shadow, and white background */}
      <div className="w-full max-w-md flex flex-col bg-white shadow-lg">
        
        {/* 1. Header Section (Sticky) */}
        <PageHeader title="Página de Inicio" />
        
        {/* 2. Main Content Area (Scrollable) */}
        {/* The 'Outlet' is where React Router will render the specific page (e.g., HomePage) */}
        <main className="flex-grow overflow-y-auto p-4">
          <Outlet />
        </main>
        
        {/* 3. Navigation Bar (Fixed at the bottom) */}
        <Navbar />

      </div>
    </div>
  );
}

export default AppLayout;