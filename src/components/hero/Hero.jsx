"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './hero.module.css';
import { dislpayName } from '@/utils/utils.js';
import Image from 'next/image';

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


  return (
    // <section className={styles.hero}>
    //   <Image 
    //     src={featured.image} 
    //     alt={featured.title} 
    //     fill 
    //     priority 
    //     className={styles.image}
    //     sizes="100vw"
    //   />
    //   <div className={styles.overlay}>
    //     <span className={styles.badge}>Lo mas jugado</span>
    //     <h1 className={styles.title}>{dislpayName(featured.title)}</h1>
    //     <p className={styles.stats}>⭐ {featured.rating?.average?.toFixed(1)}  |  🎮 {featured.playCount} veces jugado</p>
    //     <Link href={`/juego/${featured.slug}`} className={styles.playBtn}>
    //       Jugar Ahora
    //     </Link>
    //   </div>
    // </section>
    <section className={styles.hero}>
    {featured ? (
      <>
        <Image 
          src={featured.image} 
          alt={featured.title} 
          fill 
          priority 
          className={styles.image}
          sizes="100vw"
          style={{ objectFit: 'contain' }}
        />
        <div className={styles.overlay}>
          <span className={styles.badge}>Lo mas jugado</span>
          <h1 className={styles.title}>{dislpayName(featured.title)}</h1>
          <p className={styles.stats}>⭐ {featured.rating?.average?.toFixed(1)}  |  🎮 {featured.playCount} veces jugado</p>
          <Link href={`/juego/${featured.slug}`} className={styles.playBtn}>
            Jugar Ahora
          </Link>
        </div>
      </>
    ) : (
      // Esto es lo que verá el usuario (y Google) mientras carga la API
      <div className={styles.loaderContainer}>
        <div className={styles.spinner}></div> 
      </div>
    )}
  </section>
  );
}

export default Hero