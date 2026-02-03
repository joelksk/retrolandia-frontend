import styles from '../(legal)/legal.module.css';

export default function TermsPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Términos de <span>Servicio</span></h1>
      <p>Por favor, lee estos Términos de Servicio cuidadosamente antes de usar la Plataforma de Juegos Retro. Estos términos rigen el uso de nuestro sitio web y servicios.</p>
      <p><strong>Última Actualización:</strong> 26 de marzo de 2025</p>

      <div className={styles.section}>
        <h2>Acuerdo de Términos</h2>
        <p>Al acceder o usar la Plataforma de Juegos Retro, aceptas estar sujeto a estos Términos de Servicio. Si no estás de acuerdo con alguna parte de los términos, no podrás usar nuestro servicio.</p>
      </div>

      <div className={styles.section}>
        <h2>Cuentas de Usuario</h2>
        <p>Cuando creas una cuenta con nosotros, debes proporcionar información precisa, completa y actualizada. Eres responsable de proteger tu contraseña y de todas las actividades que ocurran bajo tu cuenta.</p>
        <ul>
          <li>Eres responsable de todas las actividades que ocurran bajo tu cuenta</li>
          <li>Debes notificarnos inmediatamente de cualquier uso no autorizado de tu cuenta</li>
          <li>Debes tener al menos 13 años para crear una cuenta</li>
          <li>Cada usuario tiene permitido solo una cuenta</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Contenido y Conducta del Usuario</h2>
        <p>Nuestro servicio te permite publicar, compartir y almacenar contenido. Eres responsable del contenido que publicas, incluyendo su legalidad, fiabilidad y adecuación.</p>
        <p>Al usar nuestro servicio, aceptas que no:</p>
        <ul>
          <li>Usarás el servicio para ningún propósito ilegal</li>
          <li>Violarás ninguna ley en tu jurisdicción</li>
          <li>Infringirás los derechos de propiedad intelectual de otros</li>
          <li>Transmitirás código o contenido dañino</li>
          <li>Interferirás o interrumpirás el servicio o los servidores</li>
          <li>Suplantarás a ninguna persona o entidad</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Propiedad Intelectual</h2>
        <p>El servicio y su contenido original, características y funcionalidad son propiedad de Retro Gaming y están protegidos por leyes internacionales de derechos de autor, marcas comerciales, patentes, secretos comerciales y otras leyes de propiedad intelectual. Nuestras marcas comerciales y presentación comercial no pueden ser utilizadas en conexión con ningún producto o servicio sin nuestro consentimiento previo por escrito.</p>
      </div>

      <div className={styles.section}>
        <h2>Descargo de Responsabilidad</h2>
        <p>Nuestro servicio se proporciona 'tal cual' y 'según disponibilidad'. Retro Gaming no hace garantías, expresas o implícitas, y por la presente renuncia a todas las garantías, incluyendo pero no limitado a garantías implícitas de comerciabilidad, idoneidad para un propósito particular, no infracción o curso de desempeño.</p>
      </div>

      <div className={styles.section}>
        <h2>Limitación de Responsabilidad</h2>
        <p>En ningún caso Retro Gaming, ni sus directores, empleados, socios, agentes, proveedores o afiliados, serán responsables por cualquier daño indirecto, incidental, especial, consecuente o punitivo, incluyendo sin limitación, pérdida de beneficios, datos, uso, buena voluntad u otras pérdidas intangibles, resultantes de tu acceso o uso o incapacidad para acceder o usar el servicio.</p>
      </div>

      <div className={styles.section}>
        <h2>Terminación</h2>
        <p>Podemos terminar o suspender tu cuenta inmediatamente, sin previo aviso o responsabilidad, por cualquier motivo, incluyendo sin limitación si incumples los Términos. Tras la terminación, tu derecho a usar el servicio cesará inmediatamente.</p>
      </div>

      <div className={styles.section}>
        <h2>Cambios en los Términos</h2>
        <p>Nos reservamos el derecho de modificar o reemplazar estos Términos en cualquier momento. Es tu responsabilidad revisar estos Términos periódicamente para ver los cambios. Tu uso continuado del servicio después de la publicación de cualquier cambio constituye la aceptación de esos cambios.</p>
      </div>

      <div className={styles.section}>
        <h2>Contáctanos</h2>
        <p>Si tienes alguna pregunta sobre estos Términos, por favor contáctanos en <strong>soporte.restroscore@gmail.com</strong>.</p>
      </div>
    </main>
  );
}