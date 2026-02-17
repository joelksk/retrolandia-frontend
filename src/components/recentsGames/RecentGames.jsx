'use client';
import styles from './recentGames.module.css'
import { useEffect, useState } from 'react';
import RelatedGames from '../carrousel/RelatedGames';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const RecentGames = ({onLoaded, title}) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecent = async () => {
      const history = JSON.parse(localStorage.getItem('recentGames') || '[]');
      
      if (history.length === 0) {
        setLoading(false);
        onLoaded();
        return;
      }

      try {
        const res = await fetch(`${API_URL}/api/games/recents?ids=${history.join(',')}`);
        const data = await res.json();
        setGames(data);
      } catch (err) {
        console.error("Error cargando recientes", err);
      } finally {
        setLoading(false);
        onLoaded();
      }
    };

    fetchRecent();
  }, []);

  if (!loading && games.length === 0) return null;

  return (
    <div className={styles.recentGamesContainer}>
      <RelatedGames games={games} title="Jugado Recientemente" />
    </div>
  );
};

export default RecentGames