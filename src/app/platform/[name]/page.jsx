"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import styles from './platform.module.css';
import GameCard from '@/components/GameCard';
import Loader from '@/components/loader/Loader'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const cleanName = (name) => {
  return decodeURIComponent(name)
    .replace(/\s+/g, '_')
};

const PLATFORMS = {
  NES: 'https://www.emu-land.net/uploads/subcat_8.jpg',
  SNES: 'https://www.emu-land.net/uploads/subcat_16.JPG',
  Sega_Genesis: 'https://www.emu-land.net/uploads/subcat_15.jpg' ,
}

const PlatformPage = () => {
  const { name } = useParams(); 
  const [games, setGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeLetter, setActiveLetter] = useState('');

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      let url = `${API_URL}/api/games?platform=${name}&page=${currentPage}`;
      if (activeLetter) url += `&char=${activeLetter}`;
      
      try {
        const res = await fetch(url);
        const data = await res.json();
        setGames(data.games || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoading(false);
      }
    };

    if (name) fetchGames();
  }, [name, activeLetter, currentPage]);

  const filteredGames = games.filter(g => 
    g.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleLetterChange = (letter) => {
  setActiveLetter(letter);
  setCurrentPage(1);
};

    if(loading && games.length == 0) return (<Loader message="Encendiendo Consola..." />)

  return (
    <main className={styles.container}>
      {/* Fondo dinámico de RAWG */}
        <div 
          className={styles.heroBackground} 
            style={{ backgroundImage: `url(${PLATFORMS[cleanName(name)]})`}}
        ></div>
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
              onClick={() => handleLetterChange(l)}
            >
              {l}
            </button>
          ))}
        </div>
      </section>

      <div className={`${styles.grid} ${loading ? styles.loadingGrid : ''}`}>
        {filteredGames.map(game => (
          <GameCard key={game._id} game={game} />
        ))}
      </div>

      {/**PAGINACION */}
      <div className={styles.pagination}>
          <button 
            disabled={currentPage === 1} 
            onClick={() => {
              setCurrentPage(prev => prev - 1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={styles.pageBtn}
          >
            Anterior
          </button>

          <span className={styles.pageInfo}>
            Página {currentPage} de {totalPages}
          </span>

          <button 
            disabled={currentPage === totalPages} 
            onClick={() => {
              setCurrentPage(prev => prev + 1);
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className={styles.pageBtn}
          >
            Siguiente
          </button>
        </div>
      
      {!loading && filteredGames.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>No se encontraron juegos.</p>
      )}
    </main>
  );
}

export default PlatformPage