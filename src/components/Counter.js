import React, { useEffect, useState } from 'react';
import './Counter.css';
import iconAnillos from '../assets/icon-anillos-v2-b.png';

const weddingDate = new Date('2025-11-29T19:30:00');

function getTimeLeft() {
  const now = new Date();
  const diff = weddingDate - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const Counter = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="counter-section">
  <div className="counter-overlay">
        <img src={iconAnillos} alt="Anillos" className="counter-icon" />
        <div className="counter-date">29 • 11 • 2025</div>
        <div className="counter-title">Flor <span className="counter-heart">&#9825;</span> Carlos</div>
        <div className="counter-subtitle">¡NOS CASAMOS!</div>
        <div className="counter-label">faltan</div>
        <div className="counter-countdown">
          <div className="counter-item">
            <div className="counter-number">{timeLeft.days}</div>
            <div className="counter-text">DÍAS</div>
          </div>
          <div className="counter-item">
            <div className="counter-number">{timeLeft.hours}</div>
            <div className="counter-text">HORAS</div>
          </div>
          <div className="counter-item">
            <div className="counter-number">{timeLeft.minutes}</div>
            <div className="counter-text">MIN</div>
          </div>
          <div className="counter-item">
            <div className="counter-number">{timeLeft.seconds}</div>
            <div className="counter-text">SEG</div>
          </div>
        </div>
      </div>
      {/* Mouse-style scroll indicator pinned to section bottom */}
      <a
        href="#ceremonia"
        className="mouse smoothscroll"
        aria-label="Ir a la sección de ceremonia"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('ceremonia')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
      >
        <span className="mouse-icon">
          <span className="mouse-wheel" />
        </span>
      </a>
    </section>
  );
};

export default Counter;
