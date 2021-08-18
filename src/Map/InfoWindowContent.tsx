import { forwardRef, Ref } from 'react';
import PlaceCard from '../PlaceCard/PlaceCard';
import { Place, PlaceCardType } from '../types';

interface Props {
  place: Place;
}

const InfoWindowContent = forwardRef(
  (props: Props, ref: Ref<HTMLDivElement>) => {
    return (
      <div ref={ref}>
        <PlaceCard
          place={props.place}
          type={PlaceCardType.map}
          className="border-0"
        />
      </div>
    );
  },
);

export default InfoWindowContent;
