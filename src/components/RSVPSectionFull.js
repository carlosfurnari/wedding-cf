import React, { useState } from 'react';
import iconRSVP from '../assets/icon-rsvp-b.png';
import './RSVPSectionFull.css';

const RSVPSectionFull = () => {
  const [showModal, setShowModal] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [foodRestriction, setFoodRestriction] = useState("No");
  const [otherRestriction, setOtherRestriction] = useState("");
  const [companions, setCompanions] = useState([]);

  const addCompanion = () => {
    setCompanions([...companions, { name: "", foodRestriction: "No", otherRestriction: "" }]);
  };

  const updateCompanion = (idx, field, value) => {
    const updated = companions.map((c, i) =>
      i === idx
        ? { ...c, [field]: value, ...(field === "foodRestriction" && value !== "Otras" ? { otherRestriction: "" } : {}) }
        : c
    );
    setCompanions(updated);
  };

  const removeCompanion = (idx) => {
    setCompanions(companions.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      guestName,
      foodRestriction,
      otherRestriction,
      companions
    };
    try {
      await fetch('/.netlify/functions/rsvp', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
      });
      setShowModal(false);
    } catch (err) {
      alert('Error al enviar: ' + err.message);
    }
  };

  return (
  <section
      className="site-section"
      style={{
        backgroundColor: 'transparent',
        position: 'relative',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      id="rsvp"
    >
      <div
        className="rounded p-4"
        style={{
          backgroundColor: 'var(--surface-alt)',
          maxWidth: 650,
          margin: '2rem auto',
          textAlign: 'center',
          padding: '3rem 2.5rem',
          boxSizing: 'border-box',
          borderRadius: 24,
        }}
      >
        <img
          className="img-fluid mb-0"
          src={iconRSVP}
          width="80"
          alt="RSVP Icon"
          style={{ opacity: 0.5, display: 'block', marginLeft: 'auto', marginRight: 'auto', marginBottom: '2rem' }}
        />
        <h2 className="lovestory text-gris" style={{textAlign: 'center', width: '100%', marginBottom: '1.5rem' }}>Confirmación</h2>
        <p className="text-gris" style={{textAlign: 'center', width: '100%', marginBottom: '2.2rem' }}>
          Esperamos que puedas acompañarnos.<br />¡Confirmá tu asistencia antes del 20/10/2025!
        </p>
        <div style={{textAlign: 'center', width: '100%', marginBottom: '0.5rem'}}>
          <button className="btn btn--primary btn--md"
            style={{margin: '0 auto', display: 'inline-block', marginBottom: 0}}
            onClick={() => setShowModal(true)}>
            CONFIRMAR ASISTENCIA
          </button>
        </div>
      </div>
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            overflowY: 'auto'
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 24,
              padding: '32px 24px 24px 24px',
              maxWidth: 500,
              width: '95vw',
              boxShadow: '0 4px 32px rgba(0,0,0,0.12)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={e => e.stopPropagation()}
          >
            <button style={{
              position: 'absolute', top: 16, right: 18, background: 'none', border: 'none',
              fontSize: '2.2rem', color: 'var(--primary)', cursor: 'pointer', lineHeight: 1
            }} onClick={() => setShowModal(false)}>&times;</button>
            <h3 className="lovestory text-gris" style={{textAlign: 'center', width: '100%', marginBottom: '1.2rem'}}>Confirmar asistencia</h3>
            <form style={{width: '100%'}} onSubmit={handleSubmit}>
              <label className="form-label" style={{textAlign: 'left'}}>Nombre y apellido</label>
              <input
                type="text"
                placeholder="Ingresá tu nombre completo"
                value={guestName}
                onChange={e => setGuestName(e.target.value)}
                className="form-control"
                style={{ width: '60%', maxWidth: 260, marginBottom: 18, display: 'block', marginLeft: 0 }}
              />

              <label className="form-label">¿Tenés alguna restricción alimenticia?</label>
              <select
                value={foodRestriction}
                onChange={e => { setFoodRestriction(e.target.value); if(e.target.value !== 'Otras') setOtherRestriction(''); }}
                className="form-control"
                style={{ width: '60%', maxWidth: 260, marginBottom: 18, display: 'block', marginLeft: 0 }}
              >
                <option value="No">No</option>
                <option value="Si, vegan@">Si, vegan@</option>
                <option value="Si, vegetarian@">Si, vegetarian@</option>
                <option value="Si, celiac@">Si, celiac@</option>
                <option value="Otras">Otras</option>
              </select>
              {foodRestriction === 'Otras' && (
                <input
                  type="text"
                  placeholder="Especificá tu restricción"
                  value={otherRestriction}
                  onChange={e => setOtherRestriction(e.target.value)}
                  className="form-control"
                  style={{ marginBottom: 18 }}
                />
              )}

              <button
                type="button"
                onClick={addCompanion}
                className="btn btn--secondary btn--sm"
                style={{ marginBottom: 18 }}
              >
                Agregar acompañante
              </button>

              {companions.map((companion, idx) => (
                <div key={idx} className="companion-card" style={{marginBottom: 24, border: '1px solid var(--border)', borderRadius: 8, background: 'var(--surface-alt)'}}>
                  <div className="companion-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginBottom: 8}}>
                    <label style={{display: 'block', margin: 0, fontWeight: 500}}>Nombre y apellido del acompañante</label>
                    <button
                      type="button"
                      onClick={() => removeCompanion(idx)}
                      className="companion-delete"
                    >
                      Eliminar
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Ingresá el nombre completo"
                    value={companion.name}
                    onChange={e => updateCompanion(idx, "name", e.target.value)}
                    className="form-control"
                    style={{ width: '60%', maxWidth: 260, marginBottom: 18, display: 'block', marginLeft: 0 }}
                  />

                  <label style={{display: 'block', marginBottom: 8, fontWeight: 500}}>¿Tiene alguna restricción alimenticia?</label>
                  <select
                    value={companion.foodRestriction}
                    onChange={e => updateCompanion(idx, "foodRestriction", e.target.value)}
                    className="form-control"
                    style={{ width: '60%', maxWidth: 260, marginBottom: 18, display: 'block', marginLeft: 0 }}
                  >
                    <option value="No">No</option>
                    <option value="Si, vegan@">Si, vegan@</option>
                    <option value="Si, vegetarian@">Si, vegetarian@</option>
                    <option value="Si, celiac@">Si, celiac@</option>
                    <option value="Otras">Otras</option>
                  </select>
                  {companion.foodRestriction === 'Otras' && (
                    <input
                      type="text"
                      placeholder="Especificá la restricción"
                      value={companion.otherRestriction}
                      onChange={e => updateCompanion(idx, "otherRestriction", e.target.value)}
                      className="form-control"
                      style={{ marginBottom: 18 }}
                    />
                  )}
                </div>
              ))}

              <button
                type="submit"
                className="btn btn--primary btn--md"
                style={{ width: '100%', fontWeight: 600, fontSize: '1.05rem', marginTop: 8 }}
              >
                Enviar confirmación
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default RSVPSectionFull;
