'use client'
import { useEffect, forwardRef } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const myControls = {
        0: {
            0: {
                'value': 'numpad 2', //B
                'value2': 'BUTTON_2'
            },
            1: {
                'value': 'numpad 1', //A
                'value2': 'BUTTON_4'
            },
            2: {
                'value': 'v',
                'value2': 'SELECT'
            },
            3: {
                'value': 'enter',
                'value2': 'START'
            },
            4: {
                'value': 'w', //w
                'value2': 'DPAD_UP'
            },
            5: {
                'value': 's', //s
                'value2': 'DPAD_DOWN'
            },
            6: {
                'value': 'a', //a
                'value2': 'DPAD_LEFT'
            },
            7: {
                'value': 'd', //d
                'value2': 'DPAD_RIGHT'
            },
            8: {
                'value': 'numpad 3', //C
                'value2': 'BUTTON_1'
            },
            9: {
                'value': 'numpad 4', //X
                'value2': 'BUTTON_3'
            },
            10: {
                'value': 'numpad 5', //Y
                'value2': 'LEFT_TOP_SHOULDER'
            },
            11: {
                'value': 'numpad 6', //Z
                'value2': 'RIGHT_TOP_SHOULDER'
            },
            12: {
                'value': 'tab',
                'value2': 'LEFT_BOTTOM_SHOULDER'
            },
            13: {
                'value': 'r',
                'value2': 'RIGHT_BOTTOM_SHOULDER'
            },
            14: {
                'value': '',
                'value2': 'LEFT_STICK',
            },
            15: {
                'value': '',
                'value2': 'RIGHT_STICK',
            },
            16: {
                'value': 'h',
                'value2': 'LEFT_STICK_X:+1'
            },
            17: {
                'value': 'f',
                'value2': 'LEFT_STICK_X:-1'
            },
            18: {
                'value': 'g',
                'value2': 'LEFT_STICK_Y:+1'
            },
            19: {
                'value': 't',
                'value2': 'LEFT_STICK_Y:-1'
            },
            20: {
                'value': 'l',
                'value2': 'RIGHT_STICK_X:+1'
            },
            21: {
                'value': 'j',
                'value2': 'RIGHT_STICK_X:-1'
            },
            22: {
                'value': 'k',
                'value2': 'RIGHT_STICK_Y:+1'
            },
            23: {
                'value': 'i',
                'value2': 'RIGHT_STICK_Y:-1'
            },
            24: {
                'value': '1'
            },
            25: {
                'value': '2'
            },
            26: {
                'value': '3'
            },
            27: {
                'value': 'add'
            },
            28: {
                'value': 'space'
            },
            29: {
                'value': 'subtract'
            },
        },
        1: {},
        2: {},
        3: {}
    }
const Emulator = forwardRef(({ game }, ref) => {

    useEffect(() => {
  if (!game?.romUrl) return;

  const container = document.getElementById('game-container');
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const isiOS = /iPhone|iPod/i.test(navigator.userAgent); // Específicamente iPhone

  const enableFullscreen = () => {
    if (isMobile && container) {
        if (isiOS) {
            // "TRUCO" PARA IPHONE: 
            // Forzamos al contenedor a ocupar toda la pantalla visualmente
            container.style.position = 'fixed';
            container.style.top = '0';
            container.style.left = '0';
            container.style.width = '100vw';
            container.style.height = '100vh';
            container.style.zIndex = '9999';
            
            // Intentamos ocultar la barra de direcciones haciendo un scroll mínimo
            window.scrollTo(0, 1);
        } else {
            // Método estándar para Android y iPad
            if (container.requestFullscreen) {
                container.requestFullscreen();
            } else if (container.webkitRequestFullscreen) {
                container.webkitRequestFullscreen();
            }
        }
    }
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
    window.EJS_quality = !isMobile ? 'high' : 'low';        // Baja la calidad del renderizado.
    window.EJS_pixelPerfect = isMobile ? false : true;   // Desactiva cálculos extra de escalado de imagen.
    window.EJS_FrameSkip = isMobile ? 2 : 1;
    console.log("Iniciando frames mobiles...")

    // ESTAS 3 SON LAS QUE ARREGLAN EL BUFFER:
    window.EJS_forceSync = isMobile ? false : true;
    window.EJS_sampleRate = 22050;
    window.EJS_volume = 1.0;

    if (isMobile) {
        window.EJS_adate = true;
        window.EJS_waitBeforeStart = true;
    }

    window.EJS_defaultControls = myControls;

  // Cargamos el script
  const loader = document.createElement('script');
  loader.id = 'ejs-loader';
  loader.src = '/Emulator/data/loader.js'
  loader.async = true;
  document.body.appendChild(loader);
 
    // Si después de 10 segundos el contenedor sigue vacío, 
    // es que el script falló por el historial de Chrome.
    // const checkTimeout = setTimeout(() => {
    //   const container = document.getElementById('game-container');
    //   if (container && container.innerHTML === "") {
    //     console.warn("Emulador bloqueado por historial. Forzando refresco...");
    //     window.location.reload(); // Recarga física para limpiar la memoria de WASM
    //   }
    // }, 30000);

    return () => {
    // clearTimeout(checkTimeout);

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

    try {
      const audioContexts = [];
      
      if (window.EJS_emulator && window.EJS_emulator.audioContext) {
        window.EJS_emulator.audioContext.close();
      }

      if (window.audioContext) {
        window.audioContext.close();
      }
    } catch (error) {
      console.error("Error cerrando AudioContext:", error);
    }

    const loaderScript = document.getElementById('ejs-loader');
    if (loaderScript) loaderScript.remove();

    const container = document.getElementById('game-container');
    if (container) {
      container.innerHTML = "";
      const canvas = container.querySelector('canvas');
      if (canvas) canvas.remove();
    }

    delete window.EJS_player;
    delete window.EJS_core;
    delete window.EJS_gameUrl;
    delete window.EJS_startOnLoaded;
    delete window.EJS_pathtodata;

    window.EJS_emulator = null;
    window.EJS_onGameStart = null;
    
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