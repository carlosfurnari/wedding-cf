import React, { useState } from 'react';
import iconRSVP from '../assets/icon-rsvp-b.png';
import bgWhite2 from '../assets/bg-white2.jpg';

const RSVPSectionFull = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section
      className="site-section"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.5),rgba(240,240,240,1)), url(${bgWhite2})`,
        backgroundColor: '#fff',
        backgroundPosition: '50% 50%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'relative',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      id="rsvp"
    >
      <div
        className="rounded p-4"
        style={{
          backgroundColor: 'rgba(250,250,250,0.8)',
          maxWidth: 650,
          margin: '2rem auto',
          textAlign: 'center',
          padding: '3rem 2.5rem',
          boxSizing: 'border-box',
          borderRadius: 24,
        }}
      >
        <img
          className="img-fluid mb-0"
          src={iconRSVP}
          width="80"
          alt="RSVP Icon"
          style={{ opacity: 0.5, display: 'block', marginLeft: 'auto', marginRight: 'auto', marginBottom: '2rem' }}
        />
        <h2 className="lovestory text-gris" style={{textAlign: 'center', width: '100%', marginBottom: '1.5rem' }}>Confirmación</h2>
        <p className="text-gris" style={{textAlign: 'center', width: '100%', marginBottom: '2.2rem' }}>
          Esperamos que puedas acompañarnos.<br />¡Confirmá tu asistencia antes del 20/10/2025!
        </p>
        <div style={{textAlign: 'center', width: '100%', marginBottom: '0.5rem'}}>
          <button className="btn mb-2 text-uppercase rounded-pill btn-outline-dark btn-small"
            style={{margin: '0 auto', display: 'inline-block', marginBottom: 0}}
            onClick={() => setShowModal(true)}>
            CONFIRMAR ASISTENCIA
          </button>
        </div>
      </div>
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.45)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }} onClick={() => setShowModal(false)}>
          <div style={{
            background: '#fff', borderRadius: 24, padding: '32px 24px 24px 24px',
            maxWidth: 500, width: '95vw', boxShadow: '0 4px 32px rgba(0,0,0,0.12)',
            position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center'
          }} onClick={e => e.stopPropagation()}>
            <button style={{
              position: 'absolute', top: 16, right: 18, background: 'none', border: 'none',
              fontSize: '2.2rem', color: '#bfa07a', cursor: 'pointer', lineHeight: 1
            }} onClick={() => setShowModal(false)}>&times;</button>
            <h3 className="lovestory text-gris" style={{textAlign: 'center', width: '100%', marginBottom: '1.2rem'}}>Confirmar asistencia</h3>
            {/* Aquí va el formulario avanzado si lo necesitas */}
            <p>Formulario de confirmación aquí...</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default RSVPSectionFull;
