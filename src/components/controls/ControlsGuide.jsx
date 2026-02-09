'use client';
import styles from './controlsGuide.module.css';

const CONTROLS_DATA = {
  nes: [
    { key: '1', action: 'Botón A' },
    { key: '2', action: 'Botón B' },
    { key: 'Enter', action: 'Start' },
    { key: 'Shift', action: 'Select' },
    { key: 'WASD', action: 'Movimiento' },
  ],
  snes: [
    { key: '1', action: 'Botón A' },
    { key: '2', action: 'Botón B' },
    { key: '3', action: 'Botón X' },
    { key: '4', action: 'Botón Y' },
    { key: '5', action: 'L (Hombro)' },
    { key: '6', action: 'R (Hombro)' },
    { key: 'WASD', action: 'Movimiento' },
    { key: 'Enter', action: 'Start' },
    { key: 'Shift', action: 'Select' },
  ],
  segamd: [
    { key: '1', action: 'Botón A' },
    { key: '2', action: 'Botón B' },
    { key: '3', action: 'Botón C' },
    { key: '4', action: 'Botón X' },
    { key: '5', action: 'Botón Y' },
    { key: '6', action: 'Botón Z' },
    { key: 'WASD', action: 'Movimiento' },
    { key: 'Enter', action: 'Start' },
    { key: 'Shift', action: 'Select' },
  ],
  gba: [
    { key: '1', action: 'Botón A' },
    { key: '2', action: 'Botón B' },
    { key: '5', action: 'L' },
    { key: '6', action: 'R' },
    { key: 'WASD', action: 'Movimiento' },
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