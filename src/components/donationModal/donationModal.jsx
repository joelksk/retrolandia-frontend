import React from 'react';
import styles from './donationModal.module.css';

const DonationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <span className={styles.icon}>☕</span>
          <h2>¡Muchas gracias por tu intención!</h2>
        </div>
        
        <p className={styles.message}>
          Estás por ser redirigido a <strong>Buy Me a Coffee</strong>. 
          Queremos que sepas que RetroScore es un proyecto independiente y libre de publicidad invasiva. 
          <br /><br />
          Tu aporte nos ayuda directamente a mantener los servidores y seguir sumando juegos clásicos. 
          ¡Gracias por bancar la cultura retro!
        </p>

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Volver al sitio
          </button>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            Continuar para invitar un café
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;