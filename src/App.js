import React, { useState, useEffect } from 'react';


import Counter from './components/Counter';
import CeremonyCentered from './components/CeremonyCentered';
import RSVPSectionFull from './components/RSVPSectionFull';
import DressSection from './components/DressSection';

import ItinerarySection from './components/ItinerarySection';
import GiftsSection from './components/GiftsSection';

function App() {
    // Estado para el contador
    const [timeLeft, setTimeLeft] = useState({days: 0, hours: 0, minutes: 0, seconds: 0});
    useEffect(() => {
        const target = new Date('2025-11-29T19:30:00');
        const timer = setInterval(() => {
            const now = new Date();
            const diff = target - now;
            if (diff > 0) {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((diff / (1000 * 60)) % 60);
                const seconds = Math.floor((diff / 1000) % 60);
                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="App">
            <Counter />
            {/* Resto de la web */}
            {/* <Header /> */}

            <CeremonyCentered />


            {/* Confirmación de asistencia */}
            <RSVPSectionFull />

            {/* Dress Code, Hospedaje, Traslado */}
            <DressSection />


            {/* Itinerario */}
            <ItinerarySection />

            {/* Mesa de regalos */}
            <GiftsSection />
        </div>
    );
}

export default App;