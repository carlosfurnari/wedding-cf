import React from 'react';
import iconGift from '../assets/icon-gift2-b.png';
import bgWhite3 from '../assets/bg-white3.jpg';
import './GiftsSection.css';

const GiftsSection = () => (
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
        <button className="btn mb-2 text-uppercase rounded-pill btn-outline-dark btn-small p-2 pl-3 pr-3">
          CUENTA BANCARIA
        </button>
      </div>
    </div>
  </section>
);

export default GiftsSection;
