


const Ceremony = () => (
  <section className="ceremony-section section">
    <div className="ceremony-center-content">
      <div className="ceremony-icon">
            <img src={iconAnillos} alt="Anillos" style={{width: '48px', height: '48px'}} />
      </div>
      <h2 className="ceremony-title">Ceremonia & Fiesta</h2>
      <div className="ceremony-img-wrapper">
        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Lugar de la ceremonia" className="ceremony-img" />
      </div>
      <div className="ceremony-info">
        <div className="ceremony-label">DÍA Y HORARIO</div>
        <div className="ceremony-date">29 de noviembre de 2025 a las 19:30hs</div>
        <div className="ceremony-label">LUGAR</div>
        <div className="ceremony-place">"Tomate Estación de Sabores", Av. Isabel Infanta 555</div>
      </div>
      <div className="ceremony-buttons">
        <a className="ceremony-btn" href="#" target="_blank" rel="noopener noreferrer">🗓️ AGENDAR</a>
        <a className="ceremony-btn" href="https://maps.app.goo.gl/U22VVKygxi9TTEc36" target="_blank" rel="noopener noreferrer">📍 ¿CÓMO LLEGAR?</a>
      </div>
    </div>
  </section>
);

import iconAnillos from '../assets/icon-anillos-v2-b.png';
export default Ceremony;
