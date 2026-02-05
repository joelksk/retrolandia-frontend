"use client";
import styles from './page.module.css';
import GameRow from '../components/GameRow'
import Hero from '../components/hero/Hero'

const API_URL = process.env.NEXT_PUBLIC_API_URL  || 'http://localhost:5000';

const title = 'Donde la nostalgia se encuentra con la gloria'
const description = 'Bienvenido a RetroScore, la plataforma definitiva para los amantes de los bits. Revive los clásicos que definieron una era, compite con jugadores de todo el mundo y reclama tu lugar en nuestro Salón de la Fama. Sin descargas, sin emuladores externos, solo tú y el mando';

const Home = () => {

//Cuando tengamos el modelo de Consolas, usar el hook de react para traer todas
//Asi itermaos las consolas existentes


return (
    <main className={styles.container}>
      <header className={styles.hero}>
        <h1>{title}</h1>
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