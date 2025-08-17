import React from 'react';
import iconTimeline from '../assets/icon-timeline.png';
import iconCeremonia from '../assets/timeline-icon-ceremonia.png';
import iconRecepcion from '../assets/timeline-icon-recepcion.png';
import iconNovios from '../assets/timeline-icon-novios-a.png';
import iconFin from '../assets/timeline-icon-last-call.png';
import iconCena from '../assets/timeline-icon-cena.png';
import iconDisco from '../assets/timeline-icon-disco.png';
import iconBrindis from '../assets/timeline-icon-brindis.png';
import styles from './ItinerarySection.module.css';

const timeline = [
  { time: '19:30hs', title: 'Ceremonia', icon: iconCeremonia },
  { time: '20:00hs', title: 'Recepción', icon: iconRecepcion },
  { time: '22:00hs', title: 'Cena', icon: iconCena },
  { time: '00:00hs', title: 'Torta y Brindis', icon: iconBrindis },
  { time: '01:45hs', title: 'Fin de Fiesta', icon: iconFin },
];

const ItinerarySection = () => (
  <section className={styles.sectionWrapper} id="itinerario">
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <img className={styles.headerIcon} src={iconTimeline} width="110" alt="Itinerario" style={{opacity: 0.5}} />
        <h2 className="lovestory text-center text-gris">Itinerario</h2>
      </div>
      <div className={styles.timelineContainer}>
        <div className={styles.timeline}>
          {timeline.map((item, idx) => (
            <div className={styles.timelineItem} key={item.title}>
              <div className={styles.timelineIcon}>
                <img src={item.icon} alt={item.title} className={styles.timelineIconImg} style={{opacity: 0.6}} />
              </div>
              <div className={styles.timelineContent}>
                <div className={styles.contentInner}>
                  <p className={styles.time}>{item.time}</p>
                  <h2 className={styles.title}>{item.title}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ItinerarySection;
