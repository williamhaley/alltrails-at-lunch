import React from 'react';
import { useAppSelector } from '../store/hooks';
import { Place } from '../store/slices/places';
import { RootState } from '../store/store';
import ListItem from './ListItem/ListItem';

const List: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const places = useAppSelector((state: RootState) => state.places.places);

  return (
    <div className={props.className}>
      {places.map((place: Place) => (
        <ListItem key={place.id} place={place} />
      ))}
    </div>
  );
};

export default List;
