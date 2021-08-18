import { useEffect, useState } from 'react';
import Rating from './Rating';
import { Place } from '../types';
import Heart from './Heart';
import styles from './PlaceCard.module.scss';

interface Props {
  place: Place;
  showHeartIcon: boolean;
}

const PlaceCard: React.FC<React.HTMLAttributes<HTMLDivElement> & Props> = (
  props,
) => {
  const [dollars, setDollars] = useState('');

  useEffect(() => {
    if (!props.place.priceLevel) {
      return;
    }

    setDollars(new Array(props.place.priceLevel).fill('$').join(''));
  }, [props.place.priceLevel]);

  return (
    <div className={`${props.className} card ${styles.item}`}>
      <div className="row g-0">
        <div className="col-4">
          <div className={styles.imageWrapper}>
            <img src={props.place.photoUrl} alt={props.place.name} />
          </div>
        </div>

        <div className="col-1"></div>

        <div className={props.showHeartIcon ? 'col-6' : 'col-7'}>
          <div className="card-body p-0">
            <h5 className="card-title text-truncate">{props.place.name}</h5>
            <Rating
              rating={props.place.rating}
              totalReviews={props.place.totalReviews}
            />
            {dollars && <p className="card-text">{dollars}</p>}
          </div>
        </div>

        {props.showHeartIcon && (
          <div className="col-1">
            <Heart place={props.place} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceCard;
