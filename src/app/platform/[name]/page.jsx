"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import styles from './platform.module.css';
import GameCard from '@/components/GameCard';
import Loader from '@/components/loader/Loader'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';



const PlatformPage = () => {
  const { name } = useParams(); 
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [search, setSearch] = useState('');
  const [activeLetter, setActiveLetter] = useState('');

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  useEffect(() => {
    const fetchAllGames = async () => {
      const res = await fetch(`${API_URL}/api/games?platform=${name}`);
      const data = await res.json();
      setGames(data);
      setFilteredGames(data);
    };
    if (name) fetchAllGames();
  }, [name]);

  useEffect(() => {
    let result = games;

    if (activeLetter) {
      result = result.filter(g => g.firstLetter === activeLetter);
    }

    if (search) {
      result = result.filter(g => 
        g.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredGames(result);
  }, [search, activeLetter, games]);

    if(games.length == 0) return (<Loader message="Encendiendo Consola..." />)

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>{decodeURIComponent(name).toUpperCase()}</h1>
      </header>

      <section className={styles.toolbar}>
        <div className={styles.searchWrapper}>
          <input 
            type="text" 
            placeholder="Buscar juego por el nombre..." 
            className={styles.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.alphabet}>
          <button 
            className={activeLetter === '' ? styles.activeLetter : styles.letterBtn}
            onClick={() => setActiveLetter('')}
          >
            ALL
          </button>
          {alphabet.map(l => (
            <button 
              key={l}
              className={activeLetter === l ? styles.activeLetter : styles.letterBtn}
              onClick={() => setActiveLetter(l)}
            >
              {l}
            </button>
          ))}
        </div>
      </section>

      <div className={styles.grid}>
        {filteredGames.map(game => (
          <GameCard key={game._id} game={game} />
        ))}
      </div>
      
      {filteredGames.length === 0 && (
        <p style={{ textAlign: 'center' }}>No games found with those filters.</p>
      )}
    </main>
  );
}

export default PlatformPage