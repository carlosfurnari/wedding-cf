import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import iconRSVP from '../assets/icon-rsvp-b.png';
import './RSVPSectionFull.css';
import { getOrCreateDeviceId, getRsvpSubmitted, markRsvpSubmitted, getRsvpDraft, saveRsvpDraft, clearRsvpDraft } from '../utils/device';

const RSVPSectionFull = () => {
  const [showModal, setShowModal] = useState(false);
  const [scrollYBeforeModal, setScrollYBeforeModal] = useState(0);
  const [guestName, setGuestName] = useState("");
  const [foodRestriction, setFoodRestriction] = useState("No");
  const [otherRestriction, setOtherRestriction] = useState("");
  const [companions, setCompanions] = useState([]);
  const [errors, setErrors] = useState({ guestName: '', otherRestriction: '', companions: [] });
  const deviceId = useMemo(() => getOrCreateDeviceId(), []);
  const [submitted, setSubmitted] = useState(() => getRsvpSubmitted());
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Load draft on mount
  useEffect(() => {
    const draft = getRsvpDraft();
    if (draft) {
      setGuestName(draft.guestName || "");
      setFoodRestriction(draft.foodRestriction || "No");
      setOtherRestriction(draft.otherRestriction || "");
      setCompanions(Array.isArray(draft.companions) ? draft.companions : []);
    }
  }, []);

  // Auto-save draft on changes
  useEffect(() => {
    saveRsvpDraft({ guestName, foodRestriction, otherRestriction, companions });
  }, [guestName, foodRestriction, otherRestriction, companions]);

  // Auto-hide success notice after a few seconds
  useEffect(() => {
    if (!showSuccess) return;
    const t = setTimeout(() => setShowSuccess(false), 4000);
    return () => clearTimeout(t);
  }, [showSuccess]);

  // Lock scroll using fixed body to preserve scroll position and avoid jumps
  useEffect(() => {
    const body = document.body;
    if (showModal) {
      const y = window.scrollY || window.pageYOffset || 0;
      setScrollYBeforeModal(y);
      body.style.position = 'fixed';
      body.style.top = `-${y}px`;
      body.style.left = '0';
      body.style.right = '0';
      body.style.width = '100%';
    } else {
      // restore if we had locked
      if (body.style.position === 'fixed') {
        const top = body.style.top;
        body.style.position = '';
        body.style.top = '';
        body.style.left = '';
        body.style.right = '';
        body.style.width = '';
        const restoreY = top ? -parseInt(top, 10) : (scrollYBeforeModal || 0);
        window.scrollTo({ top: restoreY, left: 0, behavior: 'auto' });
      }
    }
    return () => {
      // cleanup on unmount
      if (body.style.position === 'fixed') {
        const top = body.style.top;
        body.style.position = '';
        body.style.top = '';
        body.style.left = '';
        body.style.right = '';
        body.style.width = '';
        const restoreY = top ? -parseInt(top, 10) : (scrollYBeforeModal || 0);
        window.scrollTo({ top: restoreY, left: 0, behavior: 'auto' });
      }
    };
  }, [showModal, scrollYBeforeModal]);

  const addCompanion = () => {
    setCompanions([...companions, { name: "", foodRestriction: "No", otherRestriction: "" }]);
    setErrors((prev) => ({
      ...prev,
      companions: [...(prev.companions || []), { name: '', otherRestriction: '' }]
    }));
  };

  const updateCompanion = (idx, field, value) => {
    const updated = companions.map((c, i) =>
      i === idx
        ? { ...c, [field]: value, ...(field === "foodRestriction" && value !== "Otras" ? { otherRestriction: "" } : {}) }
        : c
    );
    setCompanions(updated);
    // clear errors for this field when user types a value
    setErrors((prev) => {
      const next = { ...prev, companions: [...(prev.companions || [])] };
      if (!next.companions[idx]) next.companions[idx] = { name: '', otherRestriction: '' };
      if (field === 'name') next.companions[idx].name = value.trim() ? '' : next.companions[idx].name;
      if (field === 'otherRestriction') next.companions[idx].otherRestriction = value.trim() ? '' : next.companions[idx].otherRestriction;
      if (field === 'foodRestriction' && value !== 'Otras') next.companions[idx].otherRestriction = '';
      return next;
    });
  };

  const removeCompanion = (idx) => {
    setCompanions(companions.filter((_, i) => i !== idx));
    setErrors((prev) => ({
      ...prev,
      companions: (prev.companions || []).filter((_, i) => i !== idx)
    }));
  };

  const validateForm = () => {
    const nextErrors = {
      guestName: '',
      otherRestriction: '',
      companions: companions.map(() => ({ name: '', otherRestriction: '' }))
    };
    if (!guestName.trim()) nextErrors.guestName = 'Requerido';
    if (foodRestriction === 'Otras' && !otherRestriction.trim()) nextErrors.otherRestriction = 'Requerido';
    companions.forEach((c, i) => {
      if (!c.name.trim()) nextErrors.companions[i].name = 'Requerido';
      if (c.foodRestriction === 'Otras' && !c.otherRestriction.trim()) nextErrors.companions[i].otherRestriction = 'Requerido';
    });
    setErrors(nextErrors);
    const hasCompanionErr = nextErrors.companions.some(e => e.name || e.otherRestriction);
    return !(
      nextErrors.guestName || nextErrors.otherRestriction || hasCompanionErr
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('Completá los campos requeridos.');
      return;
    }
    const payload = {
      guestName,
      foodRestriction,
      otherRestriction,
      companions,
      deviceId,
      ua: navigator.userAgent
    };
    try {
      setSubmitting(true);
      await fetch('/.netlify/functions/rsvp', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
      });
      markRsvpSubmitted({ deviceId, guestName, companionsCount: companions.length });
  clearRsvpDraft();
      setShowModal(false);
      setSubmitted(true);
  setShowSuccess(true);
    } catch (err) {
      alert('Error al enviar: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Simple viewport check for mobile-only adjustments
  const isMobile = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 480px)').matches;

  return (
  <section
      className="site-section"
      style={{
        backgroundColor: 'transparent',
        position: 'relative',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
  justifyContent: 'flex-start',
  /* remove top padding so the top image sits higher; keep bottom for flourish */
  padding: '0 1rem clamp(80px, 16vw, 168px) 1rem',
        boxSizing: 'border-box'
      }}
      id="rsvp"
    >
    {/* Imagen superior que preserva su relación de aspecto */}
    <img
          src="/assets/passion-2.png"
          alt="Decoración superior"
          style={{
            display: 'block',
      width: 'min(100%, 480px)',
            height: 'auto',
            margin: 0,
            marginBottom: 'clamp(20px, 6vw, 56px)',
            pointerEvents: 'none',
      userSelect: 'none',
      position: 'relative',
  zIndex: 1,
  opacity: 0.5,
  filter: 'brightness(1.06) saturate(0.9)'
          }}
        />
        <img
          className="img-fluid mb-0"
          src={iconRSVP}
          width="80"
          alt="RSVP Icon"
          style={{ opacity: 0.5, display: 'block', marginLeft: 'auto', marginRight: 'auto', marginBottom: '0.75rem' }}
        />
        <h2 className="lovestory text-gris" style={{textAlign: 'center', width: '100%', marginBottom: '1rem' }}>Confirmación</h2>
        <p className="text-gris" style={{textAlign: 'center', width: '100%', marginBottom: '2.2rem' }}>
          Esperamos que puedas acompañarnos.<br />¡Confirmá tu asistencia antes del 20/10/2025!
        </p>
        <div style={{textAlign: 'center', width: '100%', marginBottom: '0.5rem'}}>
          <button
            className="btn btn--primary btn--md"
            style={{ margin: '0 auto', display: 'inline-block', marginBottom: 0 }}
            onClick={() => { setScrollYBeforeModal(window.scrollY || window.pageYOffset || 0); setShowModal(true); }}
            disabled={submitted}
          >
            {submitted ? 'ENVIADO' : 'CONFIRMAR ASISTENCIA'}
          </button>
          {submitted && (
            showSuccess ? (
              <p role="status" aria-live="polite" style={{ marginTop: 8, fontSize: '0.95rem', color: '#2e7d32', fontWeight: 600 }}>
                ¡Gracias! Confirmación enviada.
              </p>
            ) : (
              <p style={{ marginTop: 8, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Ya enviaste tu confirmación desde este dispositivo.
              </p>
            )
          )}
        </div>
      {showModal && createPortal((
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.45)',
            display: 'grid',
            placeItems: 'center',
            zIndex: 1000,
            overflowY: 'auto',
            overflowX: 'hidden',
            padding: isMobile ? '12px' : '16px',
            paddingLeft: isMobile ? 'max(12px, env(safe-area-inset-left, 0px), env(safe-area-inset-right, 0px))' : 'max(16px, env(safe-area-inset-left, 0px), env(safe-area-inset-right, 0px))',
            paddingRight: isMobile ? 'max(12px, env(safe-area-inset-left, 0px), env(safe-area-inset-right, 0px))' : 'max(16px, env(safe-area-inset-left, 0px), env(safe-area-inset-right, 0px))',
            scrollbarGutter: 'stable both-edges',
            boxSizing: 'border-box'
          }}
          onClick={() => { setShowModal(false); }}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: 24,
              padding: isMobile ? '24px 16px 16px 16px' : '32px 24px 24px 24px',
              boxSizing: 'border-box',
              maxWidth: isMobile ? 'min(360px, 100%)' : 'min(500px, 100%)',
              width: '100%', // fill overlay content width; maxWidth narrows it on mobile
              boxShadow: '0 4px 32px rgba(0,0,0,0.12)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxHeight: '90vh',
              overflowY: 'auto',
              overflowX: 'hidden',
              margin: '0 auto',
              wordBreak: 'break-word',
              overflowWrap: 'anywhere'
            }}
            onClick={e => e.stopPropagation()}
          >
            <button style={{
              position: 'absolute', top: 16, right: 18, background: 'none', border: 'none',
              fontSize: '2.2rem', color: 'var(--primary)', cursor: 'pointer', lineHeight: 1
             }} onClick={() => { setShowModal(false); }}>&times;</button>
            <h3 className="lovestory text-gris" style={{textAlign: 'center', width: '100%', marginBottom: '1.2rem'}}>Asistencia</h3>
            <form style={{width: '100%'}} onSubmit={handleSubmit}>
              <label className="form-label" style={{textAlign: 'left'}}>Nombre y apellido</label>
              <input
                type="text"
                placeholder="Ingresá tu nombre completo"
                value={guestName}
                onChange={e => { const v = e.target.value; setGuestName(v); setErrors(prev => ({ ...prev, guestName: v.trim() ? '' : prev.guestName })); }}
                className="form-control"
                style={{ width: '100%', maxWidth: isMobile ? 320 : 360, marginBottom: 8, display: 'block', marginLeft: isMobile ? 'auto' : 0, marginRight: isMobile ? 'auto' : 0, borderColor: errors.guestName ? '#c33' : undefined }}
              />
              {errors.guestName && <small style={{ color: '#c33', display: 'block', marginBottom: 12 }}>Campo requerido</small>}

              <label className="form-label">¿Tenés alguna restricción alimenticia?</label>
              <select
                value={foodRestriction}
                onChange={e => { const v = e.target.value; setFoodRestriction(v); if(v !== 'Otras') { setOtherRestriction(''); setErrors(prev => ({ ...prev, otherRestriction: '' })); } }}
                className="form-control"
                style={{ width: '100%', maxWidth: isMobile ? 320 : 360, marginBottom: 16, display: 'block', marginLeft: isMobile ? 'auto' : 0, marginRight: isMobile ? 'auto' : 0 }}
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
          onChange={e => { const v = e.target.value; setOtherRestriction(v); setErrors(prev => ({ ...prev, otherRestriction: v.trim() ? '' : prev.otherRestriction })); }}
                  className="form-control"
          style={{ width: '100%', maxWidth: isMobile ? 320 : 360, marginBottom: 8, display: 'block', marginLeft: isMobile ? 'auto' : 0, marginRight: isMobile ? 'auto' : 0, borderColor: errors.otherRestriction ? '#c33' : undefined }}
                />
              )}
        {foodRestriction === 'Otras' && errors.otherRestriction && <small style={{ color: '#c33', display: 'block', marginBottom: 12 }}>Campo requerido</small>}

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
                    style={{ width: '100%', maxWidth: isMobile ? 320 : 360, marginBottom: 8, display: 'block', marginLeft: isMobile ? 'auto' : 0, marginRight: isMobile ? 'auto' : 0, borderColor: (errors.companions[idx] && errors.companions[idx].name) ? '#c33' : undefined }}
                  />
                  {(errors.companions[idx] && errors.companions[idx].name) && <small style={{ color: '#c33', display: 'block', marginBottom: 12 }}>Campo requerido</small>}

                  <label style={{display: 'block', marginBottom: 8, fontWeight: 500}}>¿Tiene alguna restricción alimenticia?</label>
                  <select
                    value={companion.foodRestriction}
                    onChange={e => updateCompanion(idx, "foodRestriction", e.target.value)}
                    className="form-control"
                    style={{ width: '100%', maxWidth: isMobile ? 320 : 360, marginBottom: 16, display: 'block', marginLeft: isMobile ? 'auto' : 0, marginRight: isMobile ? 'auto' : 0 }}
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
            style={{ width: '100%', maxWidth: isMobile ? 320 : 360, marginBottom: 8, display: 'block', marginLeft: isMobile ? 'auto' : 0, marginRight: isMobile ? 'auto' : 0, borderColor: (errors.companions[idx] && errors.companions[idx].otherRestriction) ? '#c33' : undefined }}
                    />
                  )}
          {companion.foodRestriction === 'Otras' && (errors.companions[idx] && errors.companions[idx].otherRestriction) && <small style={{ color: '#c33', display: 'block', marginBottom: 12 }}>Campo requerido</small>}
                </div>
              ))}

              <button
                type="submit"
                className="btn btn--primary btn--md"
                style={{ width: '100%', fontWeight: 600, fontSize: '1.05rem', marginTop: 8 }}
                disabled={submitting}
              >
                {submitting ? 'Enviando…' : 'Enviar confirmación'}
              </button>
            </form>
          </div>
        </div>
      ), document.body)}
      {/* Decorative bottom flourish rotated */}
    <img
        src="/assets/passion-1.png"
        alt="Decoración inferior"
        style={{
          display: 'block',
          position: 'absolute',
          left: '50%',
          bottom: '-1px', // asegurar que llegue al borde inferior de la sección
          transform: 'translateX(-50%) rotate(180deg)',
      zIndex: 0,
          width: 'min(88%, 400px)',
          height: 'auto',
          margin: 0,
          pointerEvents: 'none',
          opacity: 0.5,
          filter: 'brightness(1.06) saturate(0.9)'
        }}
      />
    </section>
  );
};

export default RSVPSectionFull;
