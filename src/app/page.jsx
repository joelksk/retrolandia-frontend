"use client";
import styles from './page.module.css';
import GameRow from '../components/GameRow'
import Hero from '../components/hero/Hero'

const API_URL = process.env.NEXT_PUBLIC_API_URL  || 'http://localhost:5000';

const PLATFORMS = [
  { id: 1, title: 'Sega Genesis', platform: 'Sega Genesis', img: 'https://www.emu-land.net/uploads/subcat_15.jpg'},
  { id: 2, title: 'Nintendo', platform: 'NES', img: 'https://www.emu-land.net/uploads/subcat_8.jpg'},
  { id: 3, title: 'Super Nintendo', platform: 'SNES', img: 'https://www.emu-land.net/uploads/subcat_16.JPG'}
]

const Home = () => {

return (
    <main className={styles.container}>
      <Hero />
      {PLATFORMS.map(platform => <GameRow 
                                    key={platform.id} 
                                    title={platform.title} 
                                    platform={platform.platform}
                                    img={platform.img} />)}
    </main>
  );
}

export default Home