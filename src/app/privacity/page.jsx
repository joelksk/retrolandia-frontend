import styles from '../(legal)/legal.module.css';

export default function PrivacyPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Política de <span>Privacidad</span></h1>
      <p>Esta Política de Privacidad explica cómo Retroscore recopila, usa y protege tu información personal cuando usas nuestros servicios.</p>
      <p><strong>Última Actualización:</strong> 09 de febrero de 2026</p>

      <div className={styles.section}>
        <h2>Información que Recopilamos</h2>
        <p>Cuando usas nuestros servicios, recopilamos los siguientes tipos de información:</p>
        <ul>
          <li><strong>Datos de Usuario:</strong> Nombre de usuario y correo electrónico (en caso de registro o contacto).</li>
          <li><strong>Datos de Juego y Rankings:</strong> Puntuaciones, tiempos de juego, y específicamente las <strong>capturas de pantalla (screenshots)</strong> que subes voluntariamente para validar tus récords.</li>
          <li><strong>Información Técnica:</strong> Dirección IP (para prevenir fraudes en votos/rankings), tipo de navegador e información del dispositivo para optimizar el rendimiento del emulador.</li>
          <li><strong>Cookies:</strong> Archivos de datos necesarios para mantener tu sesión activa y recordar tus configuraciones de control.</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Cómo Usamos Tu Información</h2>
        <p>Usamos la información recopilada para:</p>
        <ul>
          <li>Gestionar y mostrar públicamente las tablas de clasificación (Rankings).</li>
          <li><strong>Moderación:</strong> Revisar las capturas de pantalla enviadas para asegurar la legitimidad de los récords.</li>
          <li>Optimizar el emulador según tu hardware (como los ajustes de rendimiento automáticos).</li>
          <li>Atender tus consultas enviadas a través de nuestro widget de soporte "Retro Support".</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Donaciones y Pagos</h2>
        <p>Para el mantenimiento del sitio, utilizamos plataformas externas como <strong>"Buy Me a Coffee"</strong>. RetroScore <strong>no recopila ni almacena</strong> datos de tarjetas de crédito o información financiera. El procesamiento de estas transacciones se rige por las políticas de privacidad de dichas plataformas externas.</p>
      </div>

      <div className={styles.section}>
        <h2>Contenido de Terceros y Emulación</h2>
        <p>Nuestra plataforma utiliza núcleos de emulación de código abierto. RetroScore no reclama propiedad sobre las ROMs de los juegos, las cuales son propiedad intelectual de sus respectivos desarrolladores y distribuidores. El uso del emulador es bajo responsabilidad del usuario.</p>
      </div>

      <div className={styles.section}>
        <h2>Compartición de Datos</h2>
        <p>No vendemos tus datos. Solo compartimos información en casos específicos:</p>
        <ul>
          <li>Publicación de tu nombre de usuario y puntuación en los rankings públicos.</li>
          <li>Cumplimiento de requerimientos legales o protección de la integridad de nuestra plataforma contra ataques o fraude.</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Tus Derechos</h2>
        <p>Puedes solicitar el acceso, corrección o eliminación de tus datos (incluyendo tus récords y capturas subidas) enviando un correo a nuestra casilla de soporte.</p>
      </div>

      <div className={styles.section}>
        <h2>Contáctanos</h2>
        <p>Si tienes alguna pregunta sobre esta Política de Privacidad, por favor contáctanos en <strong>soporte.retroscore@gmail.com</strong>.</p>
      </div>
    </main>
  );
}