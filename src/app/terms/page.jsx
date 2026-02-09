import styles from '../(legal)/legal.module.css';

export default function TermsPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Términos de <span>Servicio</span></h1>
      <p>Por favor, lee estos Términos de Servicio cuidadosamente antes de usar la Plataforma de RetroScore. Estos términos rigen el uso de nuestro sitio web y servicios.</p>
      <p><strong>Última Actualización:</strong> 09 de febrero de 2026</p>

      <div className={styles.section}>
        <h2>Acuerdo de Términos</h2>
        <p>Al acceder o usar RetroScore, aceptas estar sujeto a estos Términos. Si no estás de acuerdo, no podrás usar nuestro servicio.</p>
      </div>

      <div className={styles.section}>
        <h2>Uso del Emulador y Rankings</h2>
        <p>RetroScore es una plataforma de preservación y competencia. Para mantener la integridad de nuestros rankings, aceptas las siguientes reglas:</p>
        <ul>
          <li><strong>Prohibición de Trampas:</strong> Queda estrictamente prohibido el uso de software externo (Cheat Engines), manipulación del código del emulador, uso de "Save States" para corregir errores durante el juego o cualquier método que otorgue una ventaja injusta.</li>
          <li><strong>Validación de Récords:</strong> Todo récord enviado para el ranking global debe estar acompañado de una prueba (captura de pantalla o video) según se requiera.</li>
          <li><strong>Derecho de Remoción:</strong> Nos reservamos el derecho de eliminar cualquier puntuación que consideremos sospechosa, fraudulenta o que no cumpla con los estándares de calidad de la captura, sin previo aviso.</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Propiedad Intelectual y Contenido</h2>
        <p>RetroScore no reclama propiedad sobre los títulos de videojuegos, personajes o marcas mostradas; estos pertenecen a sus respectivos dueños. El servicio se ofrece con fines educativos y de entretenimiento bajo el concepto de preservación técnica.</p>
        <p>Al subir capturas de pantalla o contenido a la plataforma, nos otorgas una licencia mundial y gratuita para mostrar dicho contenido en nuestras tablas de clasificación y redes sociales relacionadas con RetroScore.</p>
      </div>

      <div className={styles.section}>
        <h2>Donaciones y Soporte</h2>
        <p>Las donaciones realizadas a través de "Buy Me a Coffee" son aportes voluntarios para el mantenimiento de los servidores. Estas donaciones no constituyen la compra de un producto o servicio y no son reembolsables.</p>
      </div>

      <div className={styles.section}>
        <h2>Descargo de Responsabilidad</h2>
        <p>El servicio se proporciona 'tal cual'. RetroScore no garantiza que el emulador sea compatible con todos los dispositivos o que el servicio sea ininterrumpido. No nos hacemos responsables por la pérdida de datos, progresos de juego o errores técnicos derivados del uso del navegador.</p>
      </div>

      <div className={styles.section}>
        <h2>Limitación de Responsabilidad</h2>
        <p>En ningún caso RetroScore será responsable por daños indirectos, incidentales o pérdida de datos resultantes de tu acceso o uso del servicio. El uso de los emuladores web es bajo tu propio riesgo.</p>
      </div>

      <div className={styles.section}>
        <h2>Terminación</h2>
        <p>Podemos terminar o suspender tu acceso inmediatamente, sin previo aviso, si detectamos conductas que afecten la integridad de la comunidad o los rankings.</p>
      </div>

      <div className={styles.section}>
        <h2>Contáctanos</h2>
        <p>Si tienes alguna pregunta sobre estos Términos, por favor contáctanos en <strong>soporte.retroscore@gmail.com</strong>.</p>
      </div>
    </main>
  );
}