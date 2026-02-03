'use client'
import { useEffect, forwardRef } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const Emulator = forwardRef(({ game }, ref) => {

    useEffect(() => {
  if (!game?.romUrl) return;

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

    // ESTAS 3 SON LAS QUE ARREGLAN EL BUFFER:
    window.EJS_forceSync = true;
    window.EJS_sampleRate = 44100;
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

  // 1. Detener el motor de forma segura
  try {
    if (window.EJS_terminate) {
      window.EJS_terminate();
    }
  } catch (e) {
    console.warn("Error al terminar EJS:", e);
  }

  // 2. Quitar el script del DOM
  const loaderScript = document.getElementById('ejs-loader');
  if (loaderScript) loaderScript.remove();

  // 3. Limpiar el contenedor (evita que queden restos visuales o canvas huérfanos)
  const container = document.getElementById('game-container');
  if (container) container.innerHTML = "";

  // 4. Limpiar variables globales (USAR DELETE)
  delete window.EJS_player;
  delete window.EJS_core;
  delete window.EJS_gameUrl;
  delete window.EJS_startOnLoaded;
  delete window.EJS_pathtodata;
  
  // 5. Matar la instancia del emulador por completo
  window.EJS_emulator = null;
  
  console.log("🧼 Memoria del emulador limpia");
    const audioCtx = window.AudioContext || window.webkitAudioContext;
    if (audioCtx) {
           // Esto silencia cualquier nodo de audio colgado
    }
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