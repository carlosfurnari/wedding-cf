



import iconAnillos from '../assets/icon-anillos-v2-b.png';
import tomateImg from '../assets/tomate.jpeg';
import React from 'react';

const Ceremony = () => (
      <section className="ceremonyfiesta-section">
  <div className="ceremonyfiesta-content-centered">
          <img src={iconAnillos} alt="Icono anillos" className="ceremonyfiesta-icon" style={{width: '120px', opacity: 0.5, marginBottom: 0, marginTop: 0}} />
          <h2 className="lovestory text-center text-gris" style={{fontFamily: 'Great Vibes, cursive', fontSize: '2.5rem', margin: '1rem 0 0.5rem 0'}}>Ceremonia</h2>
          <img 
            src={tomateImg} 
            alt="Ceremonia & Fiesta" 
            className="img-fluid rounded-circle mb-3" 
            style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '50%' }} 
          />
          <p className="text-black-50 mb-2 font-weight-bolder section-sub-title" style={{marginTop: '1.2rem', marginBottom: '0.2rem'}}>DIA Y HORARIO</p>
          <p className="text-center text-gris">29 de Noviembre de 2025 a las 19:30hs</p>
          <p className="text-black-50 mb-2 font-weight-bolder section-sub-title" style={{marginTop: '1.2rem', marginBottom: '0.2rem'}}>LUGAR</p>
          <p className="text-center text-gris">"Tomate", Av. Infanta Isabel 555, CABA</p>
          <div className="ceremonyfiesta-buttons">
            <button className="btn mb-2 text-uppercase rounded-pill btn-outline-dark btn-small p-2 pl-3 pr-3">
              <i className="icon-calendar" aria-hidden="true"></i>  Agendar
            </button>
            <button className="btn mb-2 text-uppercase rounded-pill btn-outline-dark btn-small p-2 pl-3 pr-3">
              <i className="icon-map-marker" aria-hidden="true"></i>  ¿CÓMO LLEGAR?
            </button>
          </div>
        </div>
      </section>
);

export default Ceremony;
