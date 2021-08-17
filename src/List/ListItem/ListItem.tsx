import { useEffect, useState } from 'react';
import Stars from './Stars';
import styles from './ListItem.module.scss';
import { Place } from '../../types';

interface Props {
  place: Place;
}

const ListItem: React.FC<React.HTMLAttributes<HTMLDivElement> & Props> = (
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
    <div className={`${props.className} card p-3 ${styles.item}`}>
      <div className="row g-0">
        <div className="col-md-4">
          <img
            className="img-fluid rounded-start"
            alt={`${props.place.name}`}
            src={props.place.photoUrl}
          />
        </div>

        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{props.place.name}</h5>
            <Stars rating={props.place.rating} />
            {dollars && <p className="card-text">{dollars}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
