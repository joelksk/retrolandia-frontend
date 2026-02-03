import styles from './footer.module.css';
import Link from 'next/link';

const Footer = () => {

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <h2 className={styles.logo}>RETRO<span>SCORE</span></h2>
          <p>Revive la era de los 8 y 16 bits directamente en tu navegador.</p>
        </div>
        
        <div className={styles.links}>
          <h4>Legal</h4>
          <Link href="/privacity">Privacidad</Link>
          <Link href="/terms">Términos</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;