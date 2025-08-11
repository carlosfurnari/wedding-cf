import React, { useState, useEffect } from 'react';

import Counter from './components/Counter';
import Ceremony from './components/Ceremony';
import Section from './components/Section';
import Gallery from './components/Gallery';
import Footer from './components/Footer';

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

            <Ceremony />

            {/* Confirmación de asistencia */}
            <Section title="Confirmar asistencia" className="rsvp-section">
                <p>Por favor, confírmanos si podrás acompañarnos en este día tan especial.</p>
                <button className="btn">Confirmar asistencia</button>
            </Section>

            {/* Mesa de regalos */}
            <Section title="Mesa de regalos" className="gifts-section">
                <p>Tu presencia es nuestro mejor regalo, pero si deseas hacernos un obsequio, aquí tienes algunas opciones:</p>
                <ul style={{textAlign: 'left', maxWidth: 400, margin: '1rem auto'}}>
                  <li>CBU: 0000003100000000001234</li>
                  <li>Alias: casamientoflorcarlos</li>
                  <li>Lista en Tienda XYZ</li>
                </ul>
            </Section>

            {/* Galería */}
            <Gallery />

            <Footer />
        </div>
    );
}

export default App;