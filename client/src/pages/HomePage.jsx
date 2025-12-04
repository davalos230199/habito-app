import React, { useState, useEffect } from 'react';

// Contextos (Los cerebros)
import { DiaProvider, useDia } from '../contexts/DiaContext';
import { HeaderProvider, useHeader } from '../contexts/HeaderContext';

// Componentes (Los órganos)
import DashboardCajas from '../components/DashboardCajas';
import RitualFlow from '../components/RitualFlow';
import LoadingSpinner from '../components/LoadingSpinner';

// --- COMPONENTE INTERNO (La lógica de Sun Self fusionada) ---
const ContenidoSunSelf = () => {
    const { registroDeHoy, isLoading: isDiaLoading, refrescarDia } = useDia();
    const { setTitle } = useHeader(); // El dummy que creamos
    const [view, setView] = useState('loading'); 
    const [dashboardActivo, setDashboardActivo] = useState('cajas'); 
    
    useEffect(() => {
        // Lógica de vista simplificada
        if (isDiaLoading) {
            setView('loading');
        } else {
            setView('dashboard');
        }
    }, [isDiaLoading]);

    const handleRitualFinish = async () => {
        setView('loading');
        await refrescarDia(); // Recarga desde LocalStorage
        setView('dashboard');
    };

    // --- RENDERIZADO ---
    if (view === 'loading') return <LoadingSpinner message="Sincronizando..." />;
    
    if (view === 'ritual') return <RitualFlow onFinish={handleRitualFinish} />;

    return (
        // QUITAMOS 'min-h-screen' y usamos 'h-full' para que respete el AppLayout
        <div className="h-full flex flex-col pb-20 bg-zinc-100"> 
            {view === 'dashboard' && (
                dashboardActivo === 'registro' 
                ? <RegistroDashboard onEdit={() => setView('ritual')} />
                : <DashboardCajas onEdit={() => setView('ritual')} />
            )}
        </div>
    );
};

// --- PÁGINA PRINCIPAL (El Contenedor) ---
const HomePage = () => {
  return (
    // Proveedores de datos envolviendo todo
    <HeaderProvider>
      <DiaProvider>
         {/* Quitamos paddings excesivos que causan desborde */}
         <div className="w-full"> 
           <ContenidoSunSelf />
         </div>
      </DiaProvider>
    </HeaderProvider>
  );
};

export default HomePage;