import React from 'react';
import './Gallery.css';

function Gallery() {
  return (
    <section className="gallery">
      <h2>Galería</h2>
      <div className="gallery-images">
        <img src="https://via.placeholder.com/150" alt="Imagen 1" />
        <img src="https://via.placeholder.com/150" alt="Imagen 2" />
        <img src="https://via.placeholder.com/150" alt="Imagen 3" />
      </div>
    </section>
  );
}

export default Gallery;