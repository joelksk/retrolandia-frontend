"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './gameRow.module.css';
import GameCard from '../components/GameCard';
import SkeletonCard from './skeleton/SkeletonCard';
import Loader from './loader/Loader';

const API_URL = process.env.NEXT_PUBLIC_API_URL  || 'http://localhost:5000';

const  GameRow = ({ title, platform }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      const res = await fetch(`${API_URL}/api/games?platform=${platform}&limit=5&sort=playCount`);
      const data = await res.json();
      setGames(data);
    };

    if (platform) fetchGames();
    setLoading(false)
  }, [platform]);

  if (games.length === 0) return (<Loader message="Buscando consolas..." /> ); 

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>{title}</h2>
        <Link href={`/platform/${platform}`} className={styles.viewAll}>
          VER MAS +
        </Link>
      </div>

      <div className={styles.grid}>
        {loading 
          ? [1, 2, 3, 4, 5].map(i => <SkeletonCard key={i} />)
          : games.map(game => <GameCard key={game._id} game={game} />)}
      </div>
    </section>
  );
}

export default GameRow