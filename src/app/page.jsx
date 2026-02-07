"use client";
import styles from './page.module.css';
import GameRow from '../components/GameRow'
import Hero from '../components/hero/Hero'

const API_URL = process.env.NEXT_PUBLIC_API_URL  || 'http://localhost:5000';

const title = 'Donde la nostalgia se encuentra con la gloria'
const description = 'RetroScore es la plataforma definitiva diseñada para transformar la nostalgia en competencia real, permitiéndote revivir los grandes clásicos de los videojuegos directamente desde tu navegador. Nuestro objetivo es centralizar la experiencia retro eliminando barreras técnicas y otorgando un valor real a tus logros a través de un sistema de Rankings Moderados, donde cada récord es validado manualmente para garantizar tablas legítimas y libre de trampas. Aquí, más que jugar, venís a inmortalizar tu habilidad, competir con una comunidad apasionada y reclamar tu lugar en las primeras posiciones';

const Home = () => {

//Cuando tengamos el modelo de Consolas, usar el hook de react para traer todas
//Asi itermaos las consolas existentes


return (
    <main className={styles.container}>
      <header className={styles.hero}>
        <p>{description}</p>
      </header>
      <Hero />
      <GameRow title="Sega Genesis" platform="Sega Genesis" />
      <GameRow title="NES" platform="NES" />
      {/* <GameRow title="GameBoy Advance" platform="GBA" /> */}
      
    </main>
  );
}

export default Home