import styles from './skeleton.module.css';

const SkeletonCard = () => {
  return (
    <div className={styles.cardWrapper}>
      <div className={`${styles.skeleton} ${styles.card}`}></div>
      <div className={`${styles.skeleton} ${styles.text}`}></div>
      <div className={`${styles.skeleton} ${styles.button}`}></div>
    </div>
  );
}

export default SkeletonCard;