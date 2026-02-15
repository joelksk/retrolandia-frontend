'use client'
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import styles from './game.module.css';
import CommentSection from '@/components/comments/CommentsSection';
import Emulator from '@/components/Emulator';
import GameRanking from '@/components/GameRankings';
import ScoreModal from '@/components/ModalScore/ScoreModal'
import Loader from '@/components/loader/Loader'
import StatusMessage from '@/components/statusMessage/StatusMessage';
import ControlsGuide from '@/components/controls/ControlsGuide'

const cleanName = (name) => {
  return decodeURIComponent(name).replace(/_/g, ' ').replace(/-/g, ' ');
};

const API_URL = process.env.NEXT_PUBLIC_API_URL  || 'http://localhost:5000';

const GameClientContent = ({initialGame}) => {
  const { slug } = useParams();
  const [game, setGame] = useState(initialGame);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [screenshot, setScreenshot] = useState(null);
  const [feedback, setFeedback] = useState(null)
  const gameCanvasRef = useRef(null);
  


  useEffect(() => {
    const loadData = async () => {
      fetch(`${API_URL}/api/games/${game._id}/play`, { method: 'POST' });
    };
    if (slug){
       loadData();
    }
  }, [slug]);

  const handleSaveScore = () => {
    const container = gameCanvasRef.current;
    const canvas = container?.querySelector('canvas');

    if (!canvas) {
        console.log("Canvas no encontrado");
        setFeedback({type: 'error', message: 'Debe iniciar el juego para poder guardar el score correctamente.'})
        return;
    }

    const capture = () => {
        try {
            const imageData = canvas.toDataURL("image/jpeg', 0.7");
            
            if (imageData && imageData.length > 1000) {
                setScreenshot(imageData);
                setIsModalOpen(true);
            } else {
                const internalData = window.EJS_emulator?.gameManager?.screenshot();
                setScreenshot(internalData);
                setIsModalOpen(true);
            }
        } catch (e) {
            console.error("Error en captura:", e);
        }
    };

    requestAnimationFrame(() => {
        capture();
    });
};

  if(!game) return (<Loader message="Cargando cartucho..." />)

  return (
    <main className={styles.container}>
      {/* Fondo dinámico de RAWG */}
      <div 
        className={styles.heroBackground} 
        style={{ backgroundImage: `url(${game.image})`}}
      ></div>
        <header className={styles.header}>
          <p className={styles.platform}>{game.platform}</p>
          <h1 className={styles.title}>{cleanName(game.title)}</h1>
        </header>

      {/* 2. LAYOUT DE JUEGO */}
      <div className={styles.mainLayout}>
        
        {/* LADO IZQUIERDO: EMULADOR */}
        <div className={styles.emulatorWrapper}>
          <Emulator game={game} ref={gameCanvasRef}/>
        </div>

        {/* LADO DERECHO: INFO Y RANKING */}
        <aside className={styles.sidebar}>
            {feedback && (
                  <StatusMessage 
                    type={feedback.type} 
                    message={feedback.message} 
                    onClose={() => setFeedback(null)} 
                  />
                )}
            <GameRanking gameId={game._id} />
            <div className={styles.btnScoreContainer}>
                <button className={styles.btnSCore} onClick={handleSaveScore}>Guardar Score</button>
                <div className={styles.tooltipContainer}>
                  <span className={styles.helpIcon}>?</span>
                  <span className={styles.tooltipText}>
                    Para guardar el score, debes ingresar el puntaje final durante el juego. Estamos trabajando para que sea automatico, disculpe las molestias.
                  </span>
              </div>
            </div>
        </aside>
      </div>

      <ControlsGuide system={game.system} />

      <section className={styles.descriptionBox}>
        <h2>Acerca de {cleanName(game.title)}</h2>
        <p>{game.description || "Loading description from database..."}</p>
      </section>

      <CommentSection gameId={game._id} />

      <ScoreModal onClose={() => setIsModalOpen(false)}
                  screenshot={screenshot}
                  isOpen={isModalOpen}
                  game={game}
                  setBg={setFeedback}></ScoreModal>
    </main>
  );
}


export default GameClientContent