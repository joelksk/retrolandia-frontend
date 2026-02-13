"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './gameRow.module.css';
import GameCard from '../components/GameCard';
import SkeletonCard from './skeleton/SkeletonCard';

const API_URL = process.env.NEXT_PUBLIC_API_URL  || 'http://localhost:5000';

const  GameRow = ({ title, platform, onLoaded }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      const res = await fetch(`${API_URL}/api/games?platform=${platform}&limit=5&sort=playCount`);
      const data = await res.json();
      setGames(data.games);
    };

    if (platform) fetchGames();
    setLoading(false)
    onLoaded()
  }, [platform]);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>{title}</h2>
      </div>

      <div className={styles.grid}>
        {loading 
          ? [1, 2, 3, 4, 5].map(i => <SkeletonCard key={i} />)
          : games.map(game => <GameCard key={game._id} game={game} />)}
      </div>
      <div className={styles.gameRowFooter}>
        <Link href={`/platform/${platform}`} className={styles.viewAll}>
          VER MAS +
        </Link>
      </div>
    </section>
  );
}

export default GameRow