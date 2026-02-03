import styles from '../(legal)/legal.module.css';

export default function AboutPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Sobre <span>Nosotros</span></h1>
      
      <div className={styles.section}>
        <h2>Nuestra Historia</h2>
        <p>Retro Gaming Platform fue fundada en 2026 por un grupo de apasionados jugadores dedicados a preservar la rica historia de los videojuegos. Creemos que los juegos clásicos de las eras de 8 bits, 16 bits y los primeros 3D merecen ser experimentados por nuevas generaciones de jugadores, a la vez que permiten a los jugadores veteranos revivir sus preciados recuerdos de juego.</p>
      </div>

      <div className={styles.section}>
        <h2>Cómo Funciona</h2>
        <p>Nuestra plataforma utiliza tecnología de emulación avanzada para recrear fielmente la experiencia de juego de consolas clásicas y máquinas arcade. Cada juego está cuidadosamente optimizado para funcionar sin problemas en navegadores modernos sin necesidad de descargas o hardware especial.</p>
        <h3>1. Elige un Juego</h3>
        <p>Explora nuestra extensa biblioteca de juegos clásicos que abarcan varias plataformas y épocas.</p>
        <h3>2. Haz Clic en Jugar</h3>
        <p>Haz clic en el botón de jugar y el juego se cargará instantáneamente en tu navegador.</p>
        <h3>3. ¡Comienza a Jugar!</h3>
        <p>Usa tu teclado o conecta un mando para experimentar los juegos tal como eran en su época.</p>
      </div>

      <div className={styles.section}>
        <h2>Nuestra Colección</h2>
        <p>Ofrecemos una biblioteca curada de juegos retro que abarcan múltiples plataformas, incluyendo:</p>
        <ul>
          <li>Nintendo Entertainment System (NES)</li>
          <li>Super Nintendo Entertainment System (SNES)</li>
          <li>Sega Genesis / Mega Drive</li>
          <li>Game Boy y Game Boy Color</li>
          <li>Game Boy Advance</li>
          <li>Sega Master System</li>
          <li>Neo Geo</li>
          <li>Juegos Arcade</li>
          <li>Y más...</li>
        </ul>
        <p>Nuestro equipo trabaja arduamente para asegurar que cada juego esté legalmente licenciado y preservado en su forma original, mientras añade características que mejoran la experiencia como guardados de estado y controles personalizables.</p>
      </div>

      <div className={styles.section}>
        <h2>Información Legal</h2>
        <p>Todos los juegos en nuestra plataforma están debidamente licenciados por los titulares de derechos de autor o pertenecen al dominio público. Estamos comprometidos a proporcionar una experiencia ética de juegos retro que respeite la propiedad intelectual mientras hace accesibles estos artefactos culturales para todos.</p>
      </div>
    </main>
  );
}