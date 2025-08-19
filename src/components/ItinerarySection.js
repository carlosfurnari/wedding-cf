import React, { useEffect, useRef } from 'react';
import iconTimeline from '../assets/icon-timeline.png';
import iconCeremonia from '../assets/timeline-icon-ceremonia.png';
import iconRecepcion from '../assets/timeline-icon-recepcion.png';
import iconFin from '../assets/timeline-icon-last-call.png';
import iconCena from '../assets/timeline-icon-cena.png';
import iconBrindis from '../assets/timeline-icon-brindis.png';
import styles from './ItinerarySection.module.css';
import decoLove from '../assets/lovestory-1.png';


const timeline = [
  { time: '19:30hs', title: 'Ceremonia', icon: iconCeremonia },
  { time: '20:00hs', title: 'Recepción', icon: iconRecepcion },
  { time: '22:00hs', title: 'Cena', icon: iconCena },
  { time: '00:00hs', title: 'Torta y Brindis', icon: iconBrindis },
  { time: '01:45hs', title: 'Fin de Fiesta', icon: iconFin },
];

const ItinerarySection = () => {
  const sectionRef = useRef(null);
  const hasSnappedRef = useRef(false);
  const prevRatioRef = useRef(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Respect reduced motion preferences
    const prefersReduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const smoothCenter = () => {
      const doc = document.scrollingElement || document.documentElement;
      const html = document.documentElement;
      const body = document.body;
      const prevHtmlSnap = html.style.scrollSnapType;
      const prevBodySnap = body.style.scrollSnapType;
      // Temporarily disable snap to avoid the browser stopping early
      html.style.scrollSnapType = 'none';
      body.style.scrollSnapType = 'none';

      const rect = el.getBoundingClientRect();
      const currentY = window.pageYOffset || window.scrollY || 0;
      const targetY = currentY + rect.top + rect.height / 2 - window.innerHeight / 2;
      const maxY = (doc?.scrollHeight || 0) - window.innerHeight;
      const finalY = Math.max(0, Math.min(targetY, maxY));

      const behavior = prefersReduce ? 'auto' : 'smooth';
      // If centering would require a negative offset (near top), fall back to aligning start
      if (targetY < 0) {
        el.scrollIntoView({ behavior, block: 'start' });
      } else {
        window.scrollTo({ top: finalY, behavior });
      }

      // Restore snap a bit after the smooth scroll should have finished
      const restoreDelay = prefersReduce ? 0 : 650;
      window.setTimeout(() => {
        html.style.scrollSnapType = prevHtmlSnap;
        body.style.scrollSnapType = prevBodySnap;
      }, restoreDelay);
    };

    const alignStart = () => {
      const html = document.documentElement;
      const body = document.body;
      const prevHtmlSnap = html.style.scrollSnapType;
      const prevBodySnap = body.style.scrollSnapType;
      html.style.scrollSnapType = 'none';
      body.style.scrollSnapType = 'none';
      const behavior = prefersReduce ? 'auto' : 'smooth';
      el.scrollIntoView({ behavior, block: 'start' });
      const restoreDelay = prefersReduce ? 0 : 500;
      window.setTimeout(() => {
        html.style.scrollSnapType = prevHtmlSnap;
        body.style.scrollSnapType = prevBodySnap;
      }, restoreDelay);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const ratio = entry.intersectionRatio;

          // Re-arm when ratio is negligible (effectively out of view),
          // this works whether you scroll down or up, even if sections overlap.
          if (ratio < 0.04) {
            hasSnappedRef.current = false;
          }

          // On first meaningful entry, center the section.
          if (!hasSnappedRef.current && ratio > 0.12) {
            hasSnappedRef.current = true;
            setTimeout(() => {
              smoothCenter();
            }, 60);
          }

          // Near top edge: if user is at/near top and section begins to show, align start.
          const scrollY = window.pageYOffset || window.scrollY || 0;
          if (!hasSnappedRef.current && scrollY < 40 && ratio > 0.02) {
            hasSnappedRef.current = true;
            setTimeout(() => {
              alignStart();
            }, 40);
          }

          prevRatioRef.current = ratio;
        }
      },
      { root: null, threshold: [0, 0.04, 0.1, 0.12, 0.5] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
  <section ref={sectionRef} className={styles.sectionWrapper} id="itinerario">
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
        zIndex: 0
      }}
    />
  </section>
  );
};

export default ItinerarySection;
