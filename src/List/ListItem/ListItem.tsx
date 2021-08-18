import { useEffect, useState } from 'react';
import styles from './ListItem.module.scss';
import { Place } from '../../types';
import Rating from './Rating';
import { toggleFavorite } from '../../store/slices/favorites';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';

interface Props {
  place: Place;
}

const ListItem: React.FC<React.HTMLAttributes<HTMLDivElement> & Props> = (
  props,
) => {
  const [dollars, setDollars] = useState('');

  const dispatch = useAppDispatch();
  const { isFavorited } = useAppSelector((state: RootState) => {
    return {
      isFavorited: state.favorites.byId[props.place.id],
    };
  });

  useEffect(() => {
    if (!props.place.priceLevel) {
      return;
    }

    setDollars(new Array(props.place.priceLevel).fill('$').join(''));
  }, [props.place.priceLevel]);

  return (
    <div className={`${props.className} card p-3 ${styles.item}`}>
      <div className="row g-0">
        <div className="col-md-4">
          <img
            className="img"
            alt={`${props.place.name}`}
            src={props.place.photoUrl}
          />
        </div>

        <div className="col-md-7">
          <div className="card-body p-0">
            <h5 className="card-title text-truncate">{props.place.name}</h5>
            <Rating
              rating={props.place.rating}
              totalReviews={props.place.totalReviews}
            />
            {dollars && <p className="card-text">{dollars}</p>}
          </div>
        </div>

        <div className="col-md-1">
          <button
            className="btn btn-link"
            onClick={() => {
              dispatch(toggleFavorite(props.place.id));
            }}
          >
            <i
              className={`bi bi-heart${
                isFavorited ? '-fill' : ''
              } text-primary`}
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
