import React from 'react';
import iconTimeline from '../assets/icon-timeline.png';
import iconCeremonia from '../assets/timeline-icon-ceremonia.png';
import iconRecepcion from '../assets/timeline-icon-recepcion.png';
import iconFin from '../assets/timeline-icon-last-call.png';
import iconCena from '../assets/timeline-icon-cena.png';
import iconBrindis from '../assets/timeline-icon-brindis.png';
import iconNovios from '../assets/timeline-icon-novios-a.png';
import styles from './ItinerarySection.module.css';
import decoLove from '../assets/lovestory-1.png';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineOppositeContent, TimelineDot } from '@mui/lab';


const timeline = [
  { time: '19:00hs', title: 'Inicio', icon: iconNovios },
  { time: '19:30hs', title: 'Ceremonia', icon: iconCeremonia },
  { time: '20:00hs', title: 'Recepción', icon: iconRecepcion },
  { time: '22:00hs', title: 'Cena', icon: iconCena },
  { time: '00:00hs', title: 'Torta y Brindis', icon: iconBrindis },
  { time: '01:45hs', title: 'Fin de Fiesta', icon: iconFin },
];

const ItinerarySection = () => {
  return (
  <section className={styles.sectionWrapper} id="itinerario">
  <div className={styles.container}>
      <div className={styles.headerRow}>
        <img
          className={styles.headerIcon}
          src={iconTimeline}
          alt="Itinerario"
          style={{ opacity: 0.5, width: 'clamp(72px, 18vw, 100px)', height: 'auto' }}
        />
        <h2 className="lovestory text-center text-gris">Itinerario</h2>
      </div>
      <div className={styles.timelineContainer}>
        <div className={styles.timeline}>
          <Timeline
            position="alternate"
            sx={{
              width: '100%',
              mx: 'auto',
              pt: 2,
              // remove default before spacer so opposite/content are symmetric
              '& .MuiTimelineItem-root:before': { flex: 0, padding: 0 }
            }}
          >
          {timeline.map((item, idx) => (
            <TimelineItem key={item.title}>
              <TimelineOppositeContent sx={{ m: 'auto 0', flex: 1, textAlign: idx % 2 === 0 ? 'right' : 'left' }}>
                <p className={styles.time} style={{ margin: 0 }}>{item.time}</p>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot sx={{ backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', width: { xs: 48, sm: 64 }, height: { xs: 48, sm: 64 }, p: 0 }}>
                  <img src={item.icon} alt={item.title} className={styles.timelineIconImg} style={{ opacity: 0.6, width: '70%', height: '70%' }} />
                </TimelineDot>
                {/* No connector: the central line is drawn by CSS in .timeline::before */}
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2, flex: 1 }}>
                <h2 className={`${styles.title} ${item.title === 'Ceremonia' ? styles.titleCeremonia : ''}`}>{item.title}</h2>
              </TimelineContent>
            </TimelineItem>
          ))}
          </Timeline>
        </div>
      </div>
    </div>
    {/* Decorative bottom-right image */}
    <img
      src={decoLove}
      alt="Decoración inferior"
      style={{
        position: 'absolute',
  right: 'clamp(-120px, -12vw, -40px)',
  bottom: 0,
        width: 'clamp(320px, 48vw, 900px)',
        height: 'auto',
        pointerEvents: 'none',
  zIndex: 0,
  opacity: 0.5,
  filter: 'brightness(1.06) saturate(0.9)'
      }}
    />
  </section>
  );
};

export default ItinerarySection;
