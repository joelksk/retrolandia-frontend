"use client";
import Link from 'next/link';
import styles from './navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          RETRO<span>SCORE</span>
        </Link>
        
        <div className={styles.menu}>
          <Link href="/" className={styles.navLink}>Inicio</Link>
          <span className={styles.badge}>v1.0.1</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar