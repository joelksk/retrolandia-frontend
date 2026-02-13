"use client";
import { dislpayName } from '@/utils/utils';
import styles from './gameCard.module.css';
import Link from 'next/link';
import Image from 'next/image';

const GameCard = ({ game }) =>{
  const displayRating = game.rating?.average?.toFixed(1) || "0";

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <div className={styles.headerContainer}>
          <span className={styles.displayRating}>⭐ {displayRating}</span>
          <span className={styles.platformBadge}>{game.platform}</span>
        </div>
        {/* <img 
          src={game.image || '/assets/no-cover.png'} 
          alt={game.title} 
          className={styles.image}
        /> */}
        <Image 
          src={game.image} 
          alt={game.title}
          width={300} 
          height={200}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title} title={game.title}>
          {dislpayName(game.title)}
        </h3>
        
        <div className={styles.stats}>
          {/* <span>🎮 {game.playCount || 0}</span> */}
        </div>

        <Link href={`/juego/${game.slug}`} className={styles.playBtn}>
          JUGAR
        </Link>
      </div>
    </div>
  );
}

export default GameCard