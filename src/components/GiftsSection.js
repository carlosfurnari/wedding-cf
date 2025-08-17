import React, { useState } from 'react';
import iconGift from '../assets/icon-gift2-b.png';
import bgWhite3 from '../assets/bg-white3.jpg';
import './GiftsSection.css';

const GiftsSection = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section
      className="site-section gifts-section"
      style={{
        backgroundImage: `linear-gradient(rgba(235,235,235,0.7),rgba(255,255,255,1)), url(${bgWhite3})`,
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
    >
      <div className="gifts-content rounded p-4 text-center">
        <img
          className="img-fluid mb-0 mt-0"
          src={iconGift}
          width="110"
          alt="Regalos Icon"
          style={{ opacity: 0.5, display: 'block', margin: '0 auto 2rem auto' }}
        />
        <h2 className="mb-3 text-center text-gris lovestory" style={{marginBottom: '1.5rem'}}>Regalos</h2>
        <p className="text-center text-gris mb-4" style={{marginBottom: '2.2rem'}}>
          Nuestro mejor regalo es que puedas acompañarnos, pero si lo deseás, podés colaborar con nuestra luna de miel.
        </p>
        <div className="gifts-buttons" style={{display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '0.5rem'}}>
          <button
            className="btn mb-2 text-uppercase rounded-pill btn-outline-dark btn-small p-2 pl-3 pr-3"
            onClick={() => setShowModal(true)}
          >
            CUENTA BANCARIA
          </button>
        </div>
      </div>
      {showModal && (
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
          onClick={() => setShowModal(false)}
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
                color: '#bfa07a',
                cursor: 'pointer',
                lineHeight: 1
              }}
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h3 className="lovestory text-gris" style={{textAlign: 'center', width: '100%', marginBottom: '1.2rem'}}>Datos bancarios</h3>
            <p style={{marginBottom: 12}}><strong>Titular:</strong> Florencia Costa</p>
            <p style={{marginBottom: 12}}><strong>Número de cuenta:</strong> 123456789012345</p>
            <p style={{marginBottom: 12}}><strong>Alias:</strong> FLOR.COSTA.CASAMIENTO</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default GiftsSection;
