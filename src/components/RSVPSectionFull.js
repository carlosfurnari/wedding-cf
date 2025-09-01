import React, { useEffect, useMemo, useState } from 'react';
import iconRSVP from '../assets/icon-rsvp-b.png';
import './RSVPSectionFull.css';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, Snackbar, Alert, Box } from '@mui/material';
import { getOrCreateDeviceId, getRsvpSubmitted, markRsvpSubmitted, getRsvpDraft, saveRsvpDraft, clearRsvpDraft } from '../utils/device';

const RSVPSectionFull = () => {
  const [showModal, setShowModal] = useState(false);
  // Dialog handles scroll lock natively; no manual body lock
  const [guestName, setGuestName] = useState("");
  const [foodRestriction, setFoodRestriction] = useState("No");
  const [otherRestriction, setOtherRestriction] = useState("");
  const [companions, setCompanions] = useState([]);
  const [snack, setSnack] = useState({ open: false, severity: 'success', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const deviceId = useMemo(() => getOrCreateDeviceId(), []);
  const [submitted, setSubmitted] = useState(() => getRsvpSubmitted());

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

  // No body lock needed with MUI Dialog

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
    // simple client-side validation
    if (!guestName.trim()) {
      setSnack({ open: true, severity: 'error', message: 'Ingresá tu nombre completo.' });
      return;
    }
    if (foodRestriction === 'Otras' && !otherRestriction.trim()) {
      setSnack({ open: true, severity: 'error', message: 'Especificá tu restricción alimenticia.' });
      return;
    }
    for (let i = 0; i < companions.length; i++) {
      const c = companions[i];
      if (!c.name.trim()) {
        setSnack({ open: true, severity: 'error', message: `Completá el nombre del acompañante #${i + 1}.` });
        return;
      }
      if (c.foodRestriction === 'Otras' && !c.otherRestriction.trim()) {
        setSnack({ open: true, severity: 'error', message: `Especificá la restricción del acompañante #${i + 1}.` });
        return;
      }
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
      setSnack({ open: true, severity: 'success', message: '¡Gracias! Registramos tu confirmación.' });
    } catch (err) {
      setSnack({ open: true, severity: 'error', message: 'Error al enviar. Intentá nuevamente.' });
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
          <Button variant="contained" color="primary" onClick={() => setShowModal(true)} disabled={!!submitted} sx={{borderRadius: '28px', px: 3, py: 1.1}}>
            CONFIRMAR ASISTENCIA
          </Button>
          {submitted && (
            <p style={{marginTop: 8, fontSize: '0.9rem', color: 'var(--text-muted)'}}>
              Ya enviaste tu confirmación desde este dispositivo.
            </p>
          )}
        </div>
      <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="xs" fullWidth>
        <DialogTitle>
          <span className="lovestory text-gris">Asistencia</span>
        </DialogTitle>
        <DialogContent dividers>
          <Box component="form" id="rsvp-form" onSubmit={handleSubmit} sx={{ mt: 0.5 }}>
            <TextField
              fullWidth
              label="Nombre y apellido"
              placeholder="Ingresá tu nombre completo"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="food-label">¿Tenés alguna restricción alimenticia?</InputLabel>
              <Select
                labelId="food-label"
                label="¿Tenés alguna restricción alimenticia?"
                value={foodRestriction}
                onChange={(e) => { const v = e.target.value; setFoodRestriction(v); if (v !== 'Otras') setOtherRestriction(''); }}
              >
                <MenuItem value="No">No</MenuItem>
                <MenuItem value="Si, vegan@">Si, vegan@</MenuItem>
                <MenuItem value="Si, vegetarian@">Si, vegetarian@</MenuItem>
                <MenuItem value="Si, celiac@">Si, celiac@</MenuItem>
                <MenuItem value="Otras">Otras</MenuItem>
              </Select>
            </FormControl>
            {foodRestriction === 'Otras' && (
              <TextField
                fullWidth
                label="Especificá tu restricción"
                placeholder="Especificá tu restricción"
                value={otherRestriction}
                onChange={(e) => setOtherRestriction(e.target.value)}
                margin="normal"
              />
            )}

            <Button type="button" variant="outlined" onClick={addCompanion} sx={{ mt: 1, mb: 2, borderRadius: '28px' }}>
              Agregar acompañante
            </Button>

            {companions.map((companion, idx) => (
              <Box key={idx} sx={{ mb: 2, p: 1.5, border: '1px solid var(--border)', borderRadius: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Box component="span" sx={{ fontWeight: 500 }}>Nombre y apellido del acompañante</Box>
                  <Button size="small" color="primary" onClick={() => removeCompanion(idx)}>Eliminar</Button>
                </Box>
                <TextField
                  fullWidth
                  label="Nombre y apellido"
                  placeholder="Ingresá el nombre completo"
                  value={companion.name}
                  onChange={(e) => updateCompanion(idx, 'name', e.target.value)}
                  margin="dense"
                />
                <FormControl fullWidth margin="dense">
                  <InputLabel id={`food-label-${idx}`}>¿Tiene alguna restricción alimenticia?</InputLabel>
                  <Select
                    labelId={`food-label-${idx}`}
                    label="¿Tiene alguna restricción alimenticia?"
                    value={companion.foodRestriction}
                    onChange={(e) => updateCompanion(idx, 'foodRestriction', e.target.value)}
                  >
                    <MenuItem value="No">No</MenuItem>
                    <MenuItem value="Si, vegan@">Si, vegan@</MenuItem>
                    <MenuItem value="Si, vegetarian@">Si, vegetarian@</MenuItem>
                    <MenuItem value="Si, celiac@">Si, celiac@</MenuItem>
                    <MenuItem value="Otras">Otras</MenuItem>
                  </Select>
                </FormControl>
                {companion.foodRestriction === 'Otras' && (
                  <TextField
                    fullWidth
                    label="Especificá la restricción"
                    placeholder="Especificá la restricción"
                    value={companion.otherRestriction}
                    onChange={(e) => updateCompanion(idx, 'otherRestriction', e.target.value)}
                    margin="dense"
                  />
                )}
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)} disabled={submitting}>Cancelar</Button>
          <Button type="submit" form="rsvp-form" variant="contained" disabled={submitting}>{submitting ? 'Enviando…' : 'Enviar confirmación'}</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snack.open} autoHideDuration={4000} onClose={() => setSnack(s => ({ ...s, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setSnack(s => ({ ...s, open: false }))} severity={snack.severity} sx={{ width: '100%' }}>
          {snack.message}
        </Alert>
      </Snackbar>
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
