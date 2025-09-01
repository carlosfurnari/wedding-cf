import React, { useState } from 'react';
import iconGift from '../assets/icon-gift2-b.png';
import './GiftsSection.css';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const GiftsSection = () => {
  const [showModal, setShowModal] = useState(false);
  // MUI Dialog manages scroll lock; no manual body locking needed

  return (
    <section
      className="site-section gifts-section"
      style={{
        backgroundColor: '#fff',
        position: 'relative',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
  <div className="gifts-content rounded text-center">
        <img
          className="img-fluid mb-0 mt-0"
          src={iconGift}
          width="110"
          alt="Regalos Icon"
          style={{ opacity: 0.5, display: 'block', margin: '0 auto 2rem auto' }}
        />
        <h2 className="mb-3 text-center text-gris lovestory" style={{marginBottom: '1.5rem'}}>Regalos</h2>
        <p className="text-center text-gris mb-4" style={{marginBottom: '2.2rem'}}>
          Nuestro mejor regalo es que puedas acompañarnos, pero si lo deseás, podés colaborar con nuestra luna de miel.
        </p>
  <div className="gifts-buttons" style={{display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '0.5rem'}}>
          <Button variant="contained" color="primary" onClick={() => setShowModal(true)} sx={{ borderRadius: '24px', px: 3, py: 1.1 }}>
            CUENTA BANCARIA
          </Button>
        </div>
      </div>
      <Dialog open={showModal} onClose={() => setShowModal(false)} maxWidth="xs" fullWidth>
        <DialogTitle>
          <span className="lovestory text-gris">Datos bancarios</span>
        </DialogTitle>
        <DialogContent dividers>
          <p style={{marginBottom: 12}}><strong>Titular:</strong> Carlos Furnari</p>
          <p style={{marginBottom: 12}}><strong>Cuenta:</strong> 0720175888000037128986</p>
          <p style={{marginBottom: 0}}><strong>Alias:</strong> fiesta.flor.carlos</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowModal(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </section>
  );
};

export default GiftsSection;
