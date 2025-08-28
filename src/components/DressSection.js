import React from 'react';
import styles from './Dress.module.css';
import dressIcon from '../assets/icon-percha-b.png';

const DressSection = () => {
  return (
  <section className={styles.sectionWrapper}>
      <div className={styles.innerContainer}>
        {/* Dress Code */}
        <div className={styles.card}>
          <img src={dressIcon} alt="Dress Code" className={styles.icon} />
          <h2 className="lovestory text-gris" style={{textAlign: 'center', width: '100%', marginBottom: '1.5rem'}}>Dress Code</h2>
          <p className="text-gris" style={{textAlign: 'center', width: '100%', marginBottom: '2.2rem'}}>Elegante Sport</p>
          <a
            className="btn btn--secondary btn--md"
            style={{ margin: '0 auto', display: 'inline-block', marginBottom: 0 }}
            href="https://pin.it/zk33JO4mv"
            target="_blank"
            rel="noopener noreferrer"
          >
            SUGERENCIAS
          </a>
        </div>
      </div>
    </section>
  );
};

export default DressSection;
