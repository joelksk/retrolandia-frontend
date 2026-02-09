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
            <span className={styles.linkDisabled}>Online</span>
            <span className={styles.linkDisabled}>Scores</span>
            <a href="/about" className={styles.navLink}>Nosotros</a>
            {/* <span className={styles.badge}>v1.0.4</span> */}
            <a href="https://cafecito.app/retroscore" className={styles.imgCafecitoContainer} target="_blank" rel="noopener noreferrer">
              <img src="/imgs/buy_me_a_coffe.png" alt="Buy me a Coffe" className={styles.imgCafecitoDesktop}/>
              <img src="/imgs/buy_me_a_coffe_mobile.jpg" alt="Buy me a Coffe" className={styles.imgCafecitoMobile}/>
            </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar