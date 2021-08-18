import { forwardRef, Ref } from 'react';
import PlaceCard from '../PlaceCard/PlaceCard';
import { Place } from '../types';
import styles from './InfoWindowContent.module.scss';

interface Props {
  place: Place;
}

const InfoWindowContent = forwardRef(
  (props: Props, ref: Ref<HTMLDivElement>) => {
    return (
      <div ref={ref}>
        <PlaceCard
          place={props.place}
          showHeartIcon={false}
          className={`border-0 ${styles.item}`}
        />
      </div>
    );
  },
);

export default InfoWindowContent;
