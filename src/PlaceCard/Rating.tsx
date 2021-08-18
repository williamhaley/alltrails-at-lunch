import styles from './Rating.module.scss';

interface Props {
  rating: number;
  totalReviews: number;
}

const MAX_RATING = 5;

const Rating = ({ rating, totalReviews }: Props) => {
  const fullStars = Math.floor(rating);

  // Hey now, you're an...
  const allStars = [];

  for (let i = 0; i < MAX_RATING; i++) {
    allStars.push(
      <i
        data-testid={i < fullStars ? 'filled-star' : 'empty-star'}
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
    <span title={`${rating} star rating`}>
      {allStars.map((star) => star)} ({totalReviews})
    </span>
  );
};

export default Rating;
