'use client'
import styles from './loader.module.css'

const Loader = ({ message = "Conectando con el servidor..." }) => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.pixelSpinner}></div>
      <span className={styles.loadingText}>{message}</span>
    </div>
  );
};

export default Loader;