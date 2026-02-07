'use client'
import { useEffect, forwardRef } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const myControls = [
    { value: 50, value2: "BUTTON_2" },           // 2 -> B (NES/Sega)
    { value: 52, value2: "BUTTON_4" },           // 4 -> X (SNES/Sega)
    { value: 16, value2: "SELECT" },             // Shift -> Select
    { value: 13, value2: "START" },              // Enter -> Start
    { value: 87, value2: "DPAD_UP" },            // W -> Arriba
    { value: 83, value2: "DPAD_DOWN" },          // S -> Abajo
    { value: 65, value2: "DPAD_LEFT" },          // A -> Izquierda
    { value: 68, value2: "DPAD_RIGHT" },         // D -> Derecha
    { value: 49, value2: "BUTTON_1" },           // 1 -> A (NES/Sega)
    { value: 51, value2: "BUTTON_3" },           // 3 -> Y (SNES/Sega)
    { value: 53, value2: "LEFT_TOP_SHOULDER" },  // 5 -> L (SNES) / C (Sega)
    { value: 54, value2: "RIGHT_TOP_SHOULDER" } // 6 -> R (SNES) / Z (Sega)
];
const Emulator = forwardRef(({ game }, ref) => {

    useEffect(() => {
  if (!game?.romUrl) return;

  const container = document.getElementById('game-container');

  const enableFullscreen = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile && container) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) { /* Safari/iOS */
        container.webkitRequestFullscreen();
      }
    }
    // Una vez activado, removemos el listener para que no intente 
    // entrar en fullscreen cada vez que el usuario presiona un botón táctil
    container.removeEventListener('click', enableFullscreen);
  };

  if (container) {
    container.addEventListener('click', enableFullscreen);
  }

  //Anulamos que las teclas de flechas muevan la pagina
  const handleKeyDown = (e) => {
    // Verificamos si el usuario está escribiendo en un campo de texto
  const isTyping = e.target.tagName === 'INPUT' || 
                   e.target.tagName === 'TEXTAREA' || 
                   e.target.isContentEditable;

  // Si está escribiendo, no bloqueamos nada, dejamos que el espacio funcione
  if (isTyping) return;

  // Si NO está escribiendo, bloqueamos las teclas que mueven el scroll
  if (["ArrowUp", "ArrowDown", "Space", "PageUp", "PageDown"].includes(e.code)) {
    e.preventDefault();
  }
  };
  window.addEventListener('keydown', handleKeyDown);

  // Limpieza preventiva: Si ya existía un emulador, lo borramos
    const existingScript = document.getElementById('ejs-loader');
    if (existingScript) existingScript.remove();
    if (window.EJS_terminate) window.EJS_terminate();

    // Configuración
    window.EJS_player = '#game-container';
    window.EJS_core = game.system;
    window.EJS_gameUrl = API_URL + game.romUrl;
    window.EJS_pathtodata = '/Emulator/data/'
    window.EJS_startOnLoaded = false;

    window.EJS_smoothing = false;      // Desactiva el suavizado (bilinear filtering). Se verá más pixelado pero corre MUCHO más rápido.
    window.EJS_quality = 'low';        // Baja la calidad del renderizado.
    window.EJS_pixelPerfect = false;   // Desactiva cálculos extra de escalado de imagen.
    window.EJS_FrameSkip = 1; // Salta 1 de cada 2 cuadros. Es casi imperceptible en móviles y duplica el rendimiento.

    // ESTAS 3 SON LAS QUE ARREGLAN EL BUFFER:
    window.EJS_forceSync = true;
    window.EJS_sampleRate = 22050;
    window.EJS_volume = 1.0;


  
  // Cargamos el script
  const loader = document.createElement('script');
  loader.id = 'ejs-loader';
  loader.src = '/Emulator/data/loader.js'
  loader.async = true;
  document.body.appendChild(loader);

  // 4. EL FIX DE LAS FLECHAS: 
    // Si después de 10 segundos el contenedor sigue vacío, 
    // es que el script falló por el historial de Chrome.
    const checkTimeout = setTimeout(() => {
      const container = document.getElementById('game-container');
      if (container && container.innerHTML === "") {
        console.warn("Emulador bloqueado por historial. Forzando refresco...");
        window.location.reload(); // Recarga física para limpiar la memoria de WASM
      }
    }, 10000);

    return () => {
    clearTimeout(checkTimeout);

    // --- DESBLOQUEAR SCROLL ---
    document.body.style.overflow = 'auto';
    window.removeEventListener('keydown', handleKeyDown);

    // 1. Detener el motor de forma segura
    try {
      if (window.EJS_terminate) {
        window.EJS_terminate();
      }
    } catch (e) {
      console.warn("Error al terminar EJS:", e);
    }

    // --- AGREGA ESTO AQUÍ PARA EL AUDIO ---
    try {
      // EmulatorJS suele crear instancias globales de audio. 
      // Vamos a buscar cualquier AudioContext activo en la ventana y cerrarlo.
      const audioContexts = [];
      
      // Algunos navegadores exponen los contextos o los podemos capturar de la instancia
      if (window.EJS_emulator && window.EJS_emulator.audioContext) {
        window.EJS_emulator.audioContext.close();
      }

      // Solución radical: Buscar y suspender el contexto de audio global si existe
      // Esto mata cualquier sonido que venga del motor WASM
      if (window.audioContext) {
        window.audioContext.close();
      }
    } catch (error) {
      console.error("Error cerrando AudioContext:", error);
    }
    // ---------------------------------------

    // 2. Quitar el script del DOM
    const loaderScript = document.getElementById('ejs-loader');
    if (loaderScript) loaderScript.remove();

    // 3. Limpiar el contenedor
    const container = document.getElementById('game-container');
    if (container) {
      container.innerHTML = "";
      // A veces queda un Canvas huérfano, lo forzamos a desaparecer
      const canvas = container.querySelector('canvas');
      if (canvas) canvas.remove();
    }

    // 4. Limpiar variables globales
    delete window.EJS_player;
    delete window.EJS_core;
    delete window.EJS_gameUrl;
    delete window.EJS_startOnLoaded;
    delete window.EJS_pathtodata;
    
    // IMPORTANTE: Asegúrate de que estas también mueran
    window.EJS_emulator = null;
    window.EJS_onGameStart = null; // Evita que se disparen eventos después de salir
    
    console.log("🧼 Memoria y Audio limpios");
  };
}, [game.romUrl, game.system]);

    return (
        <div style={{   width: '100%',
                        height:'100%',
                        aspectRatio: '4/3',
                        backgroundColor: '#000',
                        position: 'relative',
                        overflow: 'hidden',
                        border: '5px solid #333' }}>

        <div id="game-container" ref={ref} style={{ width: '100%', height: '100%' }}></div>
        </div>
    )
})

Emulator.displayName = "Emulator";
export default Emulator;