import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import iconGift from '../assets/icon-gift2-b.png';
import './GiftsSection.css';

const GiftsSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [scrollYBeforeModal, setScrollYBeforeModal] = useState(0);

  // Lock scroll using fixed body to preserve scroll position and avoid jumps
  useEffect(() => {
    const body = document.body;
    if (showModal) {
      const y = window.scrollY || window.pageYOffset || 0;
      setScrollYBeforeModal(y);
      body.style.position = 'fixed';
      body.style.top = `-${y}px`;
      body.style.left = '0';
      body.style.right = '0';
      body.style.width = '100%';
    } else {
      if (body.style.position === 'fixed') {
        const top = body.style.top;
        body.style.position = '';
        body.style.top = '';
        body.style.left = '';
        body.style.right = '';
        body.style.width = '';
        const restoreY = top ? -parseInt(top, 10) : (scrollYBeforeModal || 0);
        window.scrollTo({ top: restoreY, left: 0, behavior: 'auto' });
      }
    }
    return () => {
      if (body.style.position === 'fixed') {
        const top = body.style.top;
        body.style.position = '';
        body.style.top = '';
        body.style.left = '';
        body.style.right = '';
        body.style.width = '';
        const restoreY = top ? -parseInt(top, 10) : (scrollYBeforeModal || 0);
        window.scrollTo({ top: restoreY, left: 0, behavior: 'auto' });
      }
    };
  }, [showModal, scrollYBeforeModal]);

  return (
    <section
      className="site-section gifts-section"
      style={{
        backgroundColor: '#fff',
        position: 'relative',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
  <div className="gifts-content rounded text-center">
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
            className="btn btn--primary btn--md"
            onClick={() => { setScrollYBeforeModal(window.scrollY || window.pageYOffset || 0); setShowModal(true); }}
          >
            CUENTA BANCARIA
          </button>
        </div>
      </div>
  {showModal && createPortal((
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.45)',
            display: 'grid',
            placeItems: 'center',
            zIndex: 1000,
            padding: '16px',
            boxSizing: 'border-box',
            overflowY: 'auto',
            overflowX: 'hidden'
          }}
          onClick={() => { setShowModal(false); }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 24,
              padding: '32px 24px 24px 24px',
              maxWidth: 'min(420px, 100%)',
              width: '100%',
              boxShadow: '0 4px 32px rgba(0,0,0,0.12)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              overflow: 'hidden'
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
              onClick={() => { setShowModal(false); }}
            >
              &times;
            </button>
            <h3 className="lovestory text-gris" style={{textAlign: 'center', width: '100%', marginBottom: '1.2rem'}}>Datos bancarios</h3>
            <p style={{textAlign: 'left', marginBottom: 21}}><strong>Titular:</strong> Carlos Furnari</p>
            <p style={{textAlign: 'left', marginBottom: 7}}><strong>Cuenta $:</strong> 0720119230000003429197</p>
            <p style={{textAlign: 'left', marginBottom: 21}}><strong>Alias $:</strong> fiesta.flor.carlos.p</p>
            <p style={{textAlign: 'left', marginBottom: 7}}><strong>Cuenta US$:</strong> 0720119231000003429266</p>
            <p style={{textAlign: 'left', marginBottom: 12}}><strong>Alias US$:</strong> fiesta.flor.carlos.d</p>
          </div>
        </div>
      ), document.body)}
    </section>
  );
};

export default GiftsSection;
