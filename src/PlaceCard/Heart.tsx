import { toggleFavorite } from '../store/slices/favorites';
import { Place } from '../types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { RootState } from '../store/store';

interface Props {
  place: Place;
}

const Heart = (props: Props) => {
  const dispatch = useAppDispatch();

  const { isFavorited } = useAppSelector((state: RootState) => {
    return {
      isFavorited: state.favorites.byId[props.place.id],
    };
  });

  return (
    <button
      className="btn btn-link"
      onClick={() => {
        dispatch(toggleFavorite(props.place.id));
      }}
    >
      <i
        className={`bi bi-heart${isFavorited ? '-fill' : ''} text-primary`}
      ></i>
    </button>
  );
};

export default Heart;
