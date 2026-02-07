"use client";
import styles from './navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <a href="/" className={styles.logo}>
          RETRO<span>SCORE</span>
        </a>
        
        <div className={styles.menu}>
          <a href="/" className={styles.navLink}>Juegos</a>
            <span className={styles.linkDisabled}>
              Online
            </span>
          <a href="/about" className={styles.navLink}>Nosotros</a>
          <span className={styles.badge}>v1.0.3</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar