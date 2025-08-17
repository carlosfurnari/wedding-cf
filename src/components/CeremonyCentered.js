import React, { useState } from 'react';
import iconAnillos from '../assets/icon-anillos-v2-b.png';
import tomateImg from '../assets/tomate.jpeg';
import mapa1 from '../assets/mapa1.png';
import './Ceremony.css';

const CeremonyCentered = () => {
  const [showParkingModal, setShowParkingModal] = useState(false);

  return (
    <section className="section" style={{background: 'var(--surface)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: 'none'}}>
      <img src={iconAnillos} alt="Icono anillos" style={{width: '120px', opacity: 0.5, marginBottom: 0, marginTop: 0, display: 'block', marginLeft: 'auto', marginRight: 'auto'}} />
      <h2 
        className="lovestory text-center text-gris"
        style={{
          fontSize: 'clamp(1.6rem, 5vw, 2.1rem)',
          margin: '1rem 0 0.5rem 0',
          textAlign: 'center',
          width: '100%'
        }}
      >
        Ceremonia y Fiesta
      </h2>
      <img 
        src={tomateImg} 
        alt="Ceremonia" 
        className="img-fluid rounded-circle mb-3" 
        style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '50%', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} 
      />
      <p className="text-black-50 mb-2 font-weight-bolder section-sub-title" style={{marginTop: '1.2rem', marginBottom: '0.2rem', textAlign: 'center', width: '100%'}}>DIA Y HORARIO</p>
      <p className="text-center text-gris" style={{textAlign: 'center', width: '100%'}}>29 de Noviembre de 2025 a las 19:00hs</p>
      <p className="text-black-50 mb-2 font-weight-bolder section-sub-title" style={{marginTop: '1.2rem', marginBottom: '0.2rem', textAlign: 'center', width: '100%'}}>LUGAR</p>
      <p className="text-center text-gris" style={{textAlign: 'center', width: '100%'}}>
        "Tomate", Av. Infanta Isabel 555, CABA
      </p>
  <div className="ceremonyfiesta-buttons">
        <button className="ceremonyfiesta-btn">
          <i className="icon-calendar" aria-hidden="true"></i>  AGENDAR
        </button>
        <a
          className="ceremonyfiesta-btn"
          href="https://www.google.com/maps/place/Av.+Infanta+Isabel+555,+CABA"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="icon-map-marker" aria-hidden="true"></i>  ¿CÓMO LLEGAR?
        </a>
        <button
          className="ceremonyfiesta-btn"
          onClick={() => setShowParkingModal(true)}
        >
          <i className="icon-car" aria-hidden="true"></i>  ESTACIONAMIENTO
        </button>
      </div>
      {showParkingModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={() => setShowParkingModal(false)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 24,
              padding: '32px 24px 24px 24px',
              maxWidth: 400,
              width: '95vw',
              boxShadow: '0 4px 32px rgba(0,0,0,0.12)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
            onClick={e => e.stopPropagation()}
          >
      <button
              style={{
                position: 'absolute',
                top: 16,
                right: 18,
                background: 'none',
                border: 'none',
                fontSize: '2.2rem',
        color: 'var(--primary)',
                cursor: 'pointer',
                lineHeight: 1
              }}
              onClick={() => setShowParkingModal(false)}
            >
              &times;
            </button>
            <h3 className="lovestory text-gris" style={{textAlign: 'center', width: '100%', marginBottom: '1.2rem'}}>Estacionamiento</h3>
            <img
              src={mapa1}
              alt="Mapa estacionamiento"
              style={{
                width: '100%',
                maxWidth: 340,
                borderRadius: 16,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                marginBottom: 12
              }}
            />
            <p style={{marginBottom: 12}}>Hay estacionamiento disponible en el lugar y en las inmediaciones. Consultá al llegar por disponibilidad.</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default CeremonyCentered;
