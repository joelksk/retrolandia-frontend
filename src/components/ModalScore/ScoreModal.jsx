'use client';
import { useState, useEffect} from 'react';
import styles from './scoreModal.module.css';
import StatusMessage from '../statusMessage/StatusMessage';

const API_URL = process.env.NEXT_PUBLIC_API_URL  || 'http://localhost:5000';

const ScoreModal = ({ isOpen, onClose, screenshot, game, setBg }) => {
  const [formData, setFormData] = useState({ username: '', password: '', score: '' });
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('retrolandia_user');
      if (savedUser) {
          setFormData(prev => ({ ...prev, username: savedUser }));
      }else {
        setFormData(prev => ({ ...prev, username: '' }));
      }
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = {
      ...formData,
      screenshot: screenshot,
      gameId: game._id,
      slug: game.slug
    };

    try {
        const response = await fetch(`${API_URL}/api/rankings/pending-ranking`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(submissionData)
        });

        const result = await response.json();

        if (response.ok) {
            const userSaved = localStorage.getItem('retrolandia_user')
            const newUser = formData.username;
            if(userSaved && userSaved !== newUser) {
              localStorage.removeItem('retrolandia_my_scores')
            }
            localStorage.setItem('retrolandia_user', formData.username);
            const localScores = JSON.parse(localStorage.getItem('retrolandia_my_scores') || '{}');
            const currentBest = localScores[game._id] || 0;
            if (formData.score > currentBest) {
                localScores[game._id] = formData.score;
                localStorage.setItem('retrolandia_my_scores', JSON.stringify(localScores));
            }
            setFormData(prev => ({ ...prev, password: '', score: '' }))
            onClose();
            setBg({type: 'success', message: '🏆 ¡Récord enviado! Esperando aprobación del admin.'})
        } else {
            setFeedback({type: 'error', message: result.error})
            console.log(result)
        }
    } catch (error) {
        console.error("Error de conexión:", error);
        setFeedback({type: 'error', message: error.msg})
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <h2 className={styles.title}>Nuevo Récord</h2>
        {feedback && (
                  <StatusMessage 
                    type={feedback.type} 
                    message={feedback.message} 
                    onClose={() => setFeedback(null)} 
                  />
                )}
        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label}>Usuario</label>
            <input
              className={styles.input}
              type="text"
              required
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="PLAYER 1"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Score</label>
            <input
              className={styles.input}
              type="number"
              required
              value={formData.score}
              onChange={(e) => setFormData({ ...formData, score: e.target.value })}
              placeholder="0000"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Clave Segura</label>
            <input
              className={styles.input}
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="***"
            />
          </div>

          {screenshot && (
            <div className={styles.previewContainer}>
              <label className={styles.label}>Evidencia capturada:</label>
              <img 
                src={screenshot} 
                alt="Capture Preview" 
                className={styles.screenshotImg}
              />
            </div>
          )}

          <div className={styles.actions}>
            <button type="submit" className={`${styles.btn} ${styles.save}`}>
              Enviar
            </button>
            <button type="button" onClick={onClose} className={`${styles.btn} ${styles.cancel}`}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ScoreModal;