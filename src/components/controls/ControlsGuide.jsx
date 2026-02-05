'use client';
import styles from './controlsGuide.module.css';

const CONTROLS_DATA = {
  nes: [
    { key: 'Z', action: 'Botón A' },
    { key: 'X', action: 'Botón B' },
    { key: 'Enter', action: 'Start' },
    { key: 'Shift', action: 'Select' },
    { key: 'Flechas', action: 'Movimiento' },
  ],
  snes: [
    { key: 'X', action: 'Botón A' },
    { key: 'Z', action: 'Botón B' },
    { key: 'S', action: 'Botón X' },
    { key: 'A', action: 'Botón Y' },
    { key: 'Q', action: 'L (Hombro)' },
    { key: 'W', action: 'R (Hombro)' },
    { key: 'Enter', action: 'Start' },
    { key: 'Shift', action: 'Select' },
  ],
  segamd: [
    { key: 'S', action: 'Botón A' },
    { key: 'X', action: 'Botón B' },
    { key: 'Z', action: 'Botón C' },
    { key: 'Enter', action: 'Start' },
    { key: 'Shift', action: 'Select' },
  ],
  gba: [
    { key: 'Z', action: 'Botón A' },
    { key: 'X', action: 'Botón B' },
    { key: 'A', action: 'L' },
    { key: 'S', action: 'R' },
    { key: 'Enter', action: 'Start' },
    { key: 'Shift', action: 'Select' },
  ]
};

const ControlsGuide = ({ system }) => {
  const currentControls = CONTROLS_DATA[system?.toLowerCase()] || [];

  if (currentControls.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>🕹️ Configuración: {system?.toUpperCase()}</h3>
      <div className={styles.grid}>
        {currentControls.map((item, index) => (
          <div key={index} className={styles.item}>
            <span className={styles.keyBadge}>{item.key}</span>
            <span className={styles.actionText}>{item.action}</span>
          </div>
        ))}
      </div>
      <p className={styles.note}>* Controles predeterminados para teclado en PC</p>
    </div>
  );
};

export default ControlsGuide;