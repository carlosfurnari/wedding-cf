import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import iconAnillos from '../assets/icon-anillos-v2-b.png';
import tomateImg from '../assets/tomate.jpeg';
import mapa1 from '../assets/mapa1.png';
import bg25 from '../assets/bg25.jpg';
import './Ceremony.css';

const CeremonyCentered = () => {
  const [showParkingModal, setShowParkingModal] = useState(false);
  const [scrollYBeforeModal, setScrollYBeforeModal] = useState(0);

  // Create and download an ICS file to add the event to the default calendar
  const handleAddToCalendar = () => {
    // Event details
    const title = 'Ceremonia y Fiesta – Flor & Carlos';
    const description = 'Ceremonia y fiesta de Florencia y Carlos';
    const location = 'TOMATE, Av. Infanta Isabel 555, CABA';
    // Use UTC times for wide compatibility (Buenos Aires is UTC-3)
    const startUtc = new Date(Date.UTC(2025, 10, 29, 22, 0, 0)); // 2025-11-29 19:00 ART => 22:00Z
    const endUtc = new Date(Date.UTC(2025, 10, 30, 4, 45, 0));   // 2025-11-30 01:45 ART => 04:45Z

    const fmt = (d) => {
      const pad = (n) => String(n).padStart(2, '0');
      return (
        d.getUTCFullYear().toString() +
        pad(d.getUTCMonth() + 1) +
        pad(d.getUTCDate()) + 'T' +
        pad(d.getUTCHours()) +
        pad(d.getUTCMinutes()) +
        pad(d.getUTCSeconds()) + 'Z'
      );
    };

    const uid = `wedding-cf-${Date.now()}@local`; // simple unique id
    const dtstamp = fmt(new Date());

    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//wedding-cf//ES',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${dtstamp}`,
      `DTSTART:${fmt(startUtc)}`,
      `DTEND:${fmt(endUtc)}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Flor-Carlos-2025-11-29.ics';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(url);
      a.remove();
    }, 0);
  };

  // Lock scroll using fixed body to preserve scroll position and avoid jumps
  useEffect(() => {
    const body = document.body;
    if (showParkingModal) {
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
  }, [showParkingModal, scrollYBeforeModal]);

  return (
  <section className="ceremonyfiesta-bg" id="ceremonia">
  <div className="ceremonyfiesta-section">
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
          style={{ width: 'clamp(140px, 36vw, 200px)', height: 'clamp(140px, 36vw, 200px)', objectFit: 'cover', borderRadius: '50%', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} 
        />
        <p className="text-black-50 mb-2 font-weight-bolder section-sub-title" style={{marginTop: '1.2rem', marginBottom: '0.2rem', textAlign: 'center', width: '100%'}}>DIA Y HORARIO</p>
        <p className="text-center text-gris" style={{textAlign: 'center', width: '100%'}}>29 de Noviembre de 2025 a las 19:00hs</p>
        <p className="text-black-50 mb-2 font-weight-bolder section-sub-title" style={{marginTop: '1.2rem', marginBottom: '0.2rem', textAlign: 'center', width: '100%'}}>LUGAR</p>
        <p className="text-center text-gris" style={{textAlign: 'center', width: '100%'}}>
          "TOMATE", Infanta Isabel 555, CABA
        </p>
        <div className="ceremonyfiesta-buttons">
          <button className="ceremonyfiesta-btn" onClick={handleAddToCalendar} aria-label="Agregar al calendario">
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
            onClick={() => { setScrollYBeforeModal(window.scrollY || window.pageYOffset || 0); setShowParkingModal(true); }}
          >
            <i className="icon-car" aria-hidden="true"></i>  ESTACIONAMIENTO
          </button>
        </div>
      </div>
      {showParkingModal && createPortal((
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
          onClick={() => { setShowParkingModal(false); }}
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
              overflow: 'hidden' /* ensure large script titles don't overflow the rounded box */
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
              onClick={() => { setShowParkingModal(false); }}
            >
              &times;
            </button>
      <h3
              className="lovestory text-gris"
              style={{
                textAlign: 'center',
                width: '100%',
                margin: '0 0 1.2rem 0', // remove default top margin so it doesn't escape the modal
                padding: '0 8px',
                boxSizing: 'border-box',
        fontSize: 'clamp(1.15rem, 4.4vw, 1.55rem)',
        lineHeight: 1.05,
        whiteSpace: 'nowrap',
                overflowWrap: 'anywhere',
                wordBreak: 'break-word'
              }}
            >
              Estacionamiento
            </h3>
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
      ), document.body)}
    </section>
  );
};

export default CeremonyCentered;
