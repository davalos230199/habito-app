import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext.jsx'; 
import { BookOpen, Brain, Zap, Heart, Shield, Sparkles } from 'lucide-react';
import habitoLogo from '../assets/habito-app-logo.png';

// Componentes
import InfoSlide from './InfoSlide.jsx'; 
import Lottie from 'lottie-react';

// Animación
import sunLoopAnimation from '../assets/animations/sun-loop.json';

// --- (el array 'materialDeEstudio' sigue igual que antes) ---
const materialDeEstudio = [
    {
        id: 'mental',
        icon: Brain,
        title: "Libera Espacio Mental",
        content: (
            <>
                <p><strong>Mecanismo:</strong> Externalización Cognitiva.</p>
                <p className="mt-1 italic">"Deja de dar vueltas al mismo pensamiento." Al escribirlo, liberas recursos de tu memoria operativa para poder concentrarte.</p>
            </>
        )
    },
    {
        id: 'neuro',
        icon: Zap,
        title: "Pasa de 'Modo Automático' a 'Modo Control'",
        content: (
            <>
                <p><strong>Mecanismo:</strong> Etiquetado de Afectos (Affect Labeling).</p>
                <p className="mt-1 italic">"Pasa del 'modo automático' al 'modo control' en 2 minutos." Nombrar una emoción activa tu corteza prefrontal y calma la amígdala.</p>
            </>
        )
    },
    {
        id: 'emocional',
        icon: Heart,
        title: "Tus Pensamientos No Te Definen",
        content: (
            <>
                <p><strong>Mecanismo:</strong> Desfusión Cognitiva (ACT).</p>
                <p className="mt-1 italic">"Aprende a observarlos." Creas una distancia saludable entre vos y tus pensamientos, entendiendo que no sos ellos.</p>
            </>
        )
    },
    {
        id: 'fisico',
        icon: Shield,
        title: "Fortalece Tus Defensas",
        content: (
            <>
                <p><strong>Mecanismo:</strong> Psiconeuroinmunología.</p>
                <p className="mt-1 italic">"Reduce el 'costo oculto' del estrés." Se ha demostrado que escribir reduce el cortisol y mejora la función de los Linfocitos-T.</p>
            </>
        )
    },
    {
        id: 'fisico_energia',
        icon: Sparkles,
        title: "Libera Energía para Sanar",
        content: (
            <>
                <p><strong>Mecanismo:</strong> Teoría de la Inhibición (Pennebaker).</p>
                <p className="mt-1 italic">"Libera la energía de tu cuerpo para sanar más rápido." Dejar de gastar energía en "contener" el estrés permite a tu cuerpo reasignarla a tareas vitales, como la curación física.</p>
            </>
        )
    }
];

export default function DashboardVacio({ onStartRitual }) {
    const { user } = useAuth(); 
    const nombreUsuario = 'Viajero';

    // Estado para el acordeón de "Material de Estudio" (se mantiene igual)
    const [expandedSlideId, setExpandedSlideId] = useState(null);
    const handleInfoToggle = (id) => {
        setExpandedSlideId(prevId => (prevId === id ? null : id));
    };

    return (
        <div className="flex flex-col space-y-3">
            
            {/* --- SECCIÓN 1: Tarjeta de Bienvenida (La que debería aparecer) --- */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-zinc-50 rounded-3xl shadow-xl overflow-hidden flex flex-col items-center text-center p-6 mt-4"
            >
                {/* 1. La Animación del Sol (Forzada a SVG) */}
                <img src={habitoLogo} alt="Habito Logo" className="w-48 h-48" />
                {/* 2. El Saludo (Más amigable) */}
                <h1 className="text-3xl  text-zinc-900 font-bold">
                    ¡Hola, {nombreUsuario}!
                </h1>
                <h2 className="text-2xl text-green-600 font-semibold mt-1">
                    ¿estás listo?
                </h2>
                
                {/* 4. El Botón (Call To Action) */}
                <button
                    onClick={onStartRitual}
                    className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white text-xl py-3 rounded-xl flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform"
                    >
                    <Zap size={20} />
                    Iniciar Micro-ᚺabito
                </button>
            </motion.div>

            {/* --- SECCIÓN 2: El "Material de Estudio" (La volvemos a poner) --- */}
            <div className="">
                <h2 className="text-2xl text-zinc-800 font-semibold mb-4 text-center">
                    Beneficios
                </h2>
                
                <div className="space-y-2">
                    {materialDeEstudio.map((item) => (
                        <InfoSlide
                            key={item.id}
                            icon={item.icon}
                            title={item.title}
                            isExpanded={expandedSlideId === item.id}
                            onToggle={() => handleInfoToggle(item.id)}
                        >
                            {item.content}
                        </InfoSlide>
                    ))}
                </div>
            </div>

        </div>
    );
}