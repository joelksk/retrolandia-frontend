"use client";
import { useState } from 'react';
import styles from './page.module.css';
import GameRow from '../components/GameRow'
import Hero from '../components/hero/Hero'
import Loader from '@/components/loader/Loader';

const API_URL = process.env.NEXT_PUBLIC_API_URL  || 'http://localhost:5000';

const PLATFORMS = [
  { id: 1, title: 'Sega Genesis', platform: 'Sega Genesis',},
  { id: 2, title: 'Nintendo', platform: 'NES',},
  { id: 3, title: 'Super Nintendo', platform: 'SNES',}
]

const Home = () => {

const TOTAL_SECTIONS = PLATFORMS.length + 1;
const [loadedCount, setLoadedCount] = useState(0);

const handleLoaded = () => {
  setLoadedCount(prev => prev + 1);
};

const isGlobalLoading = loadedCount < TOTAL_SECTIONS;

return (
    <main className={styles.container}>

      {isGlobalLoading && <Loader message="Buscando consolas..." />}

      <div style={{ display: isGlobalLoading ? 'none' : 'block' }}>
        <Hero onLoaded={handleLoaded}/>
        {PLATFORMS.map(platform => <GameRow 
                                      key={platform.id} 
                                      title={platform.title} 
                                      platform={platform.platform}
                                      onLoaded={handleLoaded}
                                    />
        )}
      </div>
    </main>
  );
}

export default Home