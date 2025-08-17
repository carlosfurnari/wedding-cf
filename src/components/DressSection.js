import React, { useState } from 'react';
import styles from './Dress.module.css';
import dressIcon from '../assets/icon-percha-b.png';
import dress1 from '../assets/dress-code1.jpg';
import dress2 from '../assets/dress-code2.jpg';
import dress3 from '../assets/dress-code3.jpg';
import dress4 from '../assets/dress-code4.jpg';
import dress5 from '../assets/dress-code5.jpg';
import dress6 from '../assets/dress-code6.jpg';

const DressSection = () => {
  const [showDressModal, setShowDressModal] = useState(false);

  return (
  <section className={styles.sectionWrapper}>
      <div className={styles.innerContainer}>
        {/* Dress Code */}
        <div className={styles.card}>
          <img src={dressIcon} alt="Dress Code" className={styles.icon} />
          <h2 className="lovestory text-gris" style={{textAlign: 'center', width: '100%', marginBottom: '1.5rem'}}>Dress Code</h2>
          <p className="text-gris" style={{textAlign: 'center', width: '100%', marginBottom: '2.2rem'}}>Elegante Sport</p>
          <button className="btn btn--secondary btn--md" style={{margin: '0 auto', display: 'inline-block', marginBottom: 0}} onClick={() => setShowDressModal(true)}>
            SUGERENCIAS
          </button>
        </div>
      </div>
      {/* Dress Code Modal */}
      {showDressModal && (
        <div className={styles.modalOverlay} onClick={() => setShowDressModal(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setShowDressModal(false)}>&times;</button>
            <h3 className="lovestory text-gris" style={{textAlign: 'center', width: '100%', marginBottom: '1.2rem'}}>Ejemplos de Dress Code</h3>
            <div className={styles.dressGallery}>
              <img src={dress1} alt="Dress 1" />
              <img src={dress2} alt="Dress 2" />
              <img src={dress3} alt="Dress 3" />
              <img src={dress4} alt="Dress 4" />
              <img src={dress5} alt="Dress 5" />
              <img src={dress6} alt="Dress 6" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DressSection;
