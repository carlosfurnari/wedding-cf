import React, { useState } from 'react';
import iconRSVP from '../assets/icon-rsvp-b.png';
import bgWhite2 from '../assets/bg-white2.jpg';

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
      await fetch('https://script.google.com/macros/s/AKfycbw4Dp0Jbnt8NyHnl47bk3JDiXVsF2Kyr-q1htKETbvjWyjzeXOLsciq8RObeS9flbi7FQ/exec', {
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
        backgroundImage: `linear-gradient(rgba(255,255,255,0.5),rgba(240,240,240,1)), url(${bgWhite2})`,
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
      id="rsvp"
    >
      <div
        className="rounded p-4"
        style={{
          backgroundColor: 'rgba(250,250,250,0.8)',
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
          <button className="btn mb-2 text-uppercase rounded-pill btn-outline-dark btn-small"
            style={{margin: '0 auto', display: 'inline-block', marginBottom: 0}}
            onClick={() => setShowModal(true)}>
            CONFIRMAR ASISTENCIA
          </button>
        </div>
      </div>
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.45)', display: 'flex',
          alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }} onClick={() => setShowModal(false)}>
          <div style={{
            background: '#fff', borderRadius: 24, padding: '32px 24px 24px 24px',
            maxWidth: 500, width: '95vw', boxShadow: '0 4px 32px rgba(0,0,0,0.12)',
            position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center'
          }} onClick={e => e.stopPropagation()}>
            <button style={{
              position: 'absolute', top: 16, right: 18, background: 'none', border: 'none',
              fontSize: '2.2rem', color: '#bfa07a', cursor: 'pointer', lineHeight: 1
            }} onClick={() => setShowModal(false)}>&times;</button>
            <h3 className="lovestory text-gris" style={{textAlign: 'center', width: '100%', marginBottom: '1.2rem'}}>Confirmar asistencia</h3>
            <form style={{width: '100%'}} onSubmit={handleSubmit}>
              <label style={{display: 'block', marginBottom: 8, fontWeight: 500, textAlign: 'left'}}>Nombre y apellido</label>
              <input
                type="text"
                placeholder="Ingresá tu nombre completo"
                value={guestName}
                onChange={e => setGuestName(e.target.value)}
                style={{
                  width: '60%',
                  maxWidth: 260,
                  padding: '10px',
                  borderRadius: 8,
                  border: '1px solid #ccc',
                  marginBottom: 18,
                  display: 'block',
                  marginLeft: 0
                }}
              />

              <label style={{display: 'block', marginBottom: 8, fontWeight: 500}}>¿Tenés alguna restricción alimenticia?</label>
              <select
                value={foodRestriction}
                onChange={e => { setFoodRestriction(e.target.value); if(e.target.value !== 'Otras') setOtherRestriction(''); }}
                style={{
                  width: '60%',
                  maxWidth: 260,
                  padding: '10px',
                  borderRadius: 8,
                  border: '1px solid #ccc',
                  marginBottom: 18,
                  display: 'block',
                  marginLeft: 0
                }}
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
                  style={{width: '100%', padding: '10px', borderRadius: 8, border: '1px solid #ccc', marginBottom: 18}}
                />
              )}

              <button
                type="button"
                onClick={addCompanion}
                style={{
                  marginBottom: 18,
                  padding: '10px 16px',
                  borderRadius: 8,
                  background: '#eee',
                  border: '1px solid #ccc',
                  fontWeight: 500,
                  color: '#6d4c1a'
                }}
              >
                Agregar acompañante
              </button>

              {companions.map((companion, idx) => (
                <div key={idx} style={{marginBottom: 24, padding: 12, border: '1px solid #eee', borderRadius: 8, background: '#fafafa', position: 'relative'}}>
                  <label style={{display: 'block', marginBottom: 8, fontWeight: 500}}>Nombre y apellido del acompañante</label>
                  <input
                    type="text"
                    placeholder="Ingresá el nombre completo"
                    value={companion.name}
                    onChange={e => updateCompanion(idx, "name", e.target.value)}
                    style={{
                      width: '60%',
                      maxWidth: 260,
                      padding: '10px',
                      borderRadius: 8,
                      border: '1px solid #ccc',
                      marginBottom: 18,
                      display: 'block',
                      marginLeft: 0
                    }}
                  />

                  <label style={{display: 'block', marginBottom: 8, fontWeight: 500}}>¿Tiene alguna restricción alimenticia?</label>
                  <select
                    value={companion.foodRestriction}
                    onChange={e => updateCompanion(idx, "foodRestriction", e.target.value)}
                    style={{
                      width: '60%',
                      maxWidth: 260,
                      padding: '10px',
                      borderRadius: 8,
                      border: '1px solid #ccc',
                      marginBottom: 18,
                      display: 'block',
                      marginLeft: 0
                    }}
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
                      style={{width: '100%', padding: '10px', borderRadius: 8, border: '1px solid #ccc', marginBottom: 18}}
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => removeCompanion(idx)}
                    style={{position: 'absolute', top: 8, right: 8, background: '#ffeaea', border: '1px solid #e0b4b4', borderRadius: 8, padding: '4px 10px', color: '#b00', fontWeight: 500, cursor: 'pointer'}}
                  >
                    Eliminar
                  </button>
                </div>
              ))}

              <button
                type="submit"
                style={{width: '100%', padding: '12px', borderRadius: 8, background: '#bfa07a', color: '#fff', border: 'none', fontWeight: 600, fontSize: '1.1rem', marginTop: 8, cursor: 'pointer'}}
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
