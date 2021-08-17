import React from 'react';
import { useAppSelector } from '../store/hooks';
import { RootState } from '../store/store';
import { Place } from '../types';
import ListItem from './ListItem/ListItem';

const List: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const { isLoadingResults, places } = useAppSelector((state: RootState) => {
    return {
      isLoadingResults: state.places.isLoading,
      places: state.places.places,
    };
  });

  return (
    <div className={`${props.className} overflow-scroll h-100`}>
      {isLoadingResults ? (
        <div className="card" aria-hidden="true">
          <div className="card-body">
            <h5 className="card-title placeholder-glow">
              <span className="placeholder col-6"></span>
            </h5>
            <p className="card-text placeholder-glow">
              <span className="placeholder col-7"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-4"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-8"></span>
            </p>
          </div>
        </div>
      ) : !isLoadingResults && places.length === 0 ? (
        <div className="card" aria-hidden="true">
          <div className="card-body">
            <h5 className="card-title">No results! 😢</h5>
          </div>
        </div>
      ) : (
        places.map((place: Place) => (
          <ListItem className="mb-3" key={place.id} place={place} />
        ))
      )}
    </div>
  );
};

export default List;
