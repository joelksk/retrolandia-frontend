"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './hero.module.css';
import { dislpayName } from '@/utils/utils.js';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const Hero = ({onLoaded}) => {
  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    try {
      const fetchFeatured = async () => {
      const res = await fetch(`${API_URL}/api/games?sort=playCount&limit=1`);
      const data = await res.json();
      if (data.games.length > 0) setFeatured(data.games[0]);
    };
    fetchFeatured();      
    } catch (error) {
      console.log(error);
    }finally{
        onLoaded()
    }
  }, []);

  if (!featured) return null;

  return (
    <section className={styles.hero}>
      <img src={featured.image} alt={featured.title} className={styles.image} />
      <div className={styles.overlay}>
        <span className={styles.badge}>Lo mas jugado</span>
        <h1 className={styles.title}>{dislpayName(featured.title)}</h1>
        <p className={styles.stats}>⭐ {featured.rating?.average?.toFixed(1)}  |  🎮 {featured.playCount} veces jugado</p>
        <Link href={`/juego/${featured.slug}`} className={styles.playBtn}>
          Jugar Ahora
        </Link>
      </div>
    </section>
  );
}

export default Hero