"use client";
import { useEffect, useState } from 'react';
import styles from './gameRankings.module.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL  || 'http://localhost:5000';

const GameRanking = ({ gameId }) => {
  const [leaders, setLeaders] = useState([]);
  const [userPersonalRecord, setUserPersonalRecord] = useState(null);
  const [isUserInTopTen, setIsUserInTopTen] = useState(false);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const res = await fetch(`${API_URL}/api/rankings/${gameId}`);
        const data = await res.json();
        setLeaders(data);

        const savedUsername = localStorage.getItem('retrolandia_user');
        const userFound = data.find(player => player.username === savedUsername);
        setIsUserInTopTen(!!userFound);
      } catch (err) {
        console.error("Error cargando tabla de posiciones", err);
      }
    };

    const localScores = JSON.parse(localStorage.getItem('retrolandia_my_scores') || '{}');
    if (localScores[gameId]) {
      setUserPersonalRecord({
        username: localStorage.getItem('retrolandia_user') || 'Tú',
        score: localScores[gameId]
      });
    }

    if (gameId) fetchRankings();
  }, [gameId]);

  return (
    <div className={styles.rankingCard}>
      <h3 className={styles.title}>🏆 TOP PLAYERS</h3>
      <div className={styles.list}>
        {leaders.length > 0 ? (
          <>
            {leaders.map((player, index) => (
              <div key={player._id} className={styles.entry}>
                <span className={styles.position}>{index + 1}</span>
                <span className={styles.name}>{player.username}</span>
                <span className={styles.score}>{player.score.toLocaleString()}</span>
              </div>
            ))}

            {userPersonalRecord && !isUserInTopTen && (
              <>
                <div className={styles.divider}></div>
                <div className={`${styles.entry} ${styles.userRecord}`}>
                  <span className={styles.position}>??</span>
                  <span className={styles.name}>{userPersonalRecord.username} (Tu récord)</span>
                  <span className={styles.score}>{userPersonalRecord.score.toLocaleString()}</span>
                </div>
              </>
            )}
          </>
        ) : (
          <p className={styles.empty}>Aun no hay posiciones, ¡sé el primero!</p>
        )}
      </div>
    </div>
  );
}

export default GameRanking;