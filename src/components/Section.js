import React from 'react';
import './Section.css';

function Section({ title, children, className }) {
  return (
    <section className={`section ${className || ''}`}>
      {title && <h2>{title}</h2>}
      {children}
    </section>
  );
}

export default Section;
