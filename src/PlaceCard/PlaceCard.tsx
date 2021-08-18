import { useEffect, useState } from 'react';
import Rating from './Rating';
import { Place, PlaceCardType } from '../types';
import Heart from './Heart';

interface Props {
  place: Place;
  type?: PlaceCardType;
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

  const isMapMode = props.type === PlaceCardType.map;

  return (
    <div className={`${props.className} card "d-flex flex-row`}>
      <div className="d-flex align-items-center">
        <img
          className="me-3"
          style={{
            width: 64,
            height: 64,
            objectFit: 'cover',
          }}
          src={props.place.photoUrl}
          alt={props.place.name}
        />
      </div>

      <div className="card-body p-0">
        <div className="card-title mb-0 text-bold text-truncate">
          {props.place.name}
        </div>
        <Rating
          rating={props.place.rating}
          totalReviews={props.place.totalReviews}
        />
        {dollars && <div className="text-small">{dollars}</div>}
      </div>

      {!isMapMode && (
        <div className="d-flex align-items-start">
          <Heart place={props.place} />
        </div>
      )}
    </div>
  );
};

export default PlaceCard;
