"use client";
import styles from './page.module.css';
import GameRow from '../components/GameRow'
import Hero from '../components/hero/Hero'

const API_URL = process.env.NEXT_PUBLIC_API_URL  || 'http://localhost:5000';

const Home = () => {

//Cuando tengamos el modelo de Consolas, usar el hook de react para traer todas
//Asi itermaos las consolas existentes


return (
    <main className={styles.container}>
      <Hero />
      <GameRow title="Sega Genesis" platform="Sega Genesis" />
      <GameRow title="NES" platform="NES" />
      {/* <GameRow title="GameBoy Advance" platform="GBA" /> */}
      
    </main>
  );
}

export default Home