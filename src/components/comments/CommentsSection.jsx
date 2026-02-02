"use client";
import { useState, useEffect } from 'react';
import styles from './comments.module.css';
import Loader from '../loader/Loader';
import StatusMessage from '../statusMessage/StatusMessage';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function CommentSection({ gameId }) {
  const [comments, setComments] = useState([]);
  const [nick, setNick] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);
  const [userRating, setUserRating] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);


  useEffect(() => {
    const savedNick = localStorage.getItem('retrolandia_user');
    if (savedNick) {
      setNick(savedNick);
    }else {
      setNick('');
    }

    const fetchComments = async () => {
      try {
        const res = await fetch(`${API_URL}/api/comments/${gameId}`);
        const data = await res.json();
        setComments(data);

        if (savedNick) {
          const previousVote = data.find(c => c.author === savedNick && c.isFirstReview);
          if (previousVote) {
            setHasVoted(true);
            setUserRating(previousVote.rating);
          }
        }
      } catch (err) { console.error("Error cargando comentarios", err); }
    };
    if (gameId) fetchComments();
  }, [gameId]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nick || !text) return;
    setIsLoading(true);

    const bodyPayload = {
      gameId,
      author: nick,
      body: text,
      rating: hasVoted ? null : rating 
    };

    try {
        const res = await fetch(`${API_URL}/api/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload)
      });

      if (res.ok) {
        const newComment = await res.json();
        setComments([newComment, ...comments]);
        if (!localStorage.getItem('retrolandia_user')) {
          localStorage.setItem('retrolandia_user', nick);
        }
        setText('');
        if (!hasVoted) {
          setHasVoted(true);
          setUserRating(rating);
        }
        setFeedback({ type: 'success', message: '¡Gracias por tu aporte, gamer!' });
      }
    } catch (error) {
      setFeedback({ type: 'error', message: 'Hubo un fallo en la Matrix. Reintenta.' });
      crossOriginIsolated.log(error)
    }finally{
      setIsLoading(false);
    }
  };

  const renderStars = (rating) => {
  return (
    <div className={styles.starsWrapper}>
      {[...Array(10)].map((_, i) => (
        <span key={i} className={i < rating ? styles.starFilled : styles.starEmpty}>
          ★
        </span>
      ))}
    </div>
  );
};

  return (
    <section className={styles.commentSection}>
    <h2>💬 Comentarios</h2>
    {feedback && (
      <StatusMessage 
        type={feedback.type} 
        message={feedback.message} 
        onClose={() => setFeedback(null)} 
      />
    )}
    
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <input 
          className={styles.input}
          placeholder="Username"
          value={nick}
          onChange={(e) => setNick(e.target.value)}
          style={{ width: '30%' }}
          readOnly={window.localStorage.getItem('retrolandia_user') ? true : false}
        />
        {!hasVoted ? (
          <div className={styles.starRating}>
            {[...Array(10)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <button
                  type="button"
                  key={ratingValue}
                  className={ratingValue <= (hover || rating) ? styles.on : styles.off}
                  onClick={() => setRating(ratingValue)}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                >
                  <span className={styles.star}>&#9733;</span>
                </button>
              );
            })}
            <span className={styles.ratingNumber}>{rating > 0 ? `${rating}/10` : "Vota"}</span>
          </div>
        ) : (
          <div className={styles.votedBadge}>Tu voto: {userRating}/10</div>
        )}
      </div>
      <textarea 
        className={styles.textarea}
        placeholder="Deja tu opinión sobre este clásico..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: '100%', marginBottom: '1rem' }}
      />
      <button type="submit" className={styles.submitBtn} disabled={isLoading}>
          {isLoading ? 'Enviando...' : 'Publicar'}
        </button>
    </form>
    {isLoading && <Loader message="Procesando datos..." />}

    <div className={styles.list}>
      {comments.length > 0 ? comments.map(c => (
        <div key={c._id} className={styles.commentCard}>
          <div className={styles.avatar}>
        {c.author.charAt(0).toUpperCase()}
          </div>
          <div className={styles.commentContent}>
            <div className={styles.commentHeader}>
              <span className={styles.author}>{c.author}</span>
              <span className={styles.date} style={{fontSize: '0.8rem', opacity: 0.5, marginLeft: '10px'}}>
                {new Date(c.createdAt).toLocaleDateString()}
              </span>
            </div>
            {renderStars(c.userGameRating ? c.userGameRating : rating)}
            <p className={styles.body}>{c.body}</p>
          </div>
        </div>
      )) : (
        <div className={styles.noComments}>
          <p>🎮 Nadie ha dejado su marca aquí todavía...</p>
          <span>¡Sé el primero en comentar y valorar este clásico!</span>
        </div>
      )}
    </div>
  </section>
  );
}