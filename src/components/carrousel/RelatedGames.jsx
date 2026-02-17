import GameCard from '../GameCard';
import styles from './relatedGames.module.css';

const RelatedGames = ({ games, title}) => {
  if (!games || games.length === 0) return null;

  return (
    <div className={styles.relatedContainer}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.carousel}>
        {games.map((game) => (
          <div key={game._id} className={styles.cardWrapper}>
            <GameCard key={game._id} game={game} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedGames;