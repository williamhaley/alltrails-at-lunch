import styles from './Stars.module.scss';

interface Props {
  rating: number;
}

const MAX_RATING = 5;

const Stars = ({ rating }: Props) => {
  const fullStars = Math.floor(rating);

  // Hey now, you're an...
  const allStars = [];

  for (let i = 0; i < MAX_RATING; i++) {
    allStars.push(
      <i
        key={i}
        className={`bi ${
          i < fullStars
            ? `${styles.full} bi-star-fill`
            : `${styles.empty} bi-star`
        }`}
      ></i>,
    );
  }

  return (
    <span title={`${rating} star rating`}>{allStars.map((star) => star)}</span>
  );
};

export default Stars;
