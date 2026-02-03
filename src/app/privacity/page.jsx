import styles from '../(legal)/legal.module.css';

export default function PrivacyPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Política de <span>Privacidad</span></h1>
      <p>Esta Política de Privacidad explica cómo Retro Gaming recopila, usa y protege tu información personal cuando usas nuestros servicios.</p>
      <p><strong>Última Actualización:</strong> 01 de febrero de 2026</p>

      <div className={styles.section}>
        <h2>Información que Recopilamos</h2>
        <p>Cuando usas nuestros servicios, recopilamos los siguientes tipos de información:</p>
        <ul>
          <li>Información personal que proporcionas (email, nombre de usuario, etc.)</li>
          <li>Información de uso, como tiempo de juego y duración</li>
          <li>Información técnica, incluyendo tipo de navegador, dirección IP e información del dispositivo</li>
          <li>Información recopilada a través de cookies y tecnologías similares</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Cómo Usamos Tu Información</h2>
        <p>Usamos la información recopilada para diversos propósitos, incluyendo:</p>
        <ul>
          <li>Proporcionar y mantener nuestro servicio</li>
          <li>Mejorar y personalizar tu experiencia</li>
          <li>Comunicarnos contigo sobre actualizaciones y cambios</li>
          <li>Detectar y prevenir actividades fraudulentas y problemas de seguridad</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Cookies y Tecnologías de Seguimiento</h2>
        <p>Usamos cookies y tecnologías de seguimiento similares para rastrear la actividad en nuestro servicio y almacenar cierta información. Las cookies son archivos con una pequeña cantidad de datos que pueden incluir un identificador único anónimo. Puedes instruir a tu navegador para que rechace todas las cookies o para que indique cuándo se está enviando una cookie.</p>
      </div>

      <div className={styles.section}>
        <h2>Compartición y Divulgación de Datos</h2>
        <p>Podemos divulgar tu información personal en las siguientes situaciones:</p>
        <ul>
          <li>Con proveedores de servicios que nos ayudan a operar nuestra plataforma</li>
          <li>Para cumplir con obligaciones legales</li>
          <li>Para proteger nuestros derechos, privacidad, seguridad o propiedad</li>
          <li>En conexión con una transferencia o transacción de negocio</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Tus Derechos</h2>
        <p>Dependiendo de tu ubicación, puedes tener ciertos derechos con respecto a tu información personal, incluyendo:</p>
        <ul>
          <li>El derecho a acceder a la información personal que tenemos sobre ti</li>
          <li>El derecho a solicitar la corrección de información inexacta</li>
          <li>El derecho a solicitar la eliminación de tu información</li>
          <li>El derecho a restringir el procesamiento de tu información</li>
          <li>Derechos de portabilidad de datos</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Contáctanos</h2>
        <p>Si tienes alguna pregunta sobre esta Política de Privacidad, por favor contáctanos en <strong>soporte.restroscore@gmail.com</strong>.</p>
      </div>
    </main>
  );
}