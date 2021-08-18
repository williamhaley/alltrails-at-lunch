import { FormEvent, useContext, useEffect, useState } from 'react';
import styles from './NavBar.module.scss';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { RootState } from '../store/store';
import { GoogleContext } from '../Google/GoogleProvider';
import { search } from '../store/slices/places';
import Sort from './Sort';

const NavBar: React.FC<React.HTMLAttributes<HTMLElement>> = (props) => {
  const dispatch = useAppDispatch();

  const { isLoadingResults, coordinates } = useAppSelector(
    (state: RootState) => {
      return {
        isLoadingResults: state.places.isLoading,
        coordinates: state.location.coordinates,
      };
    },
  );

  const { isGoogleLoaded, mapInstance } = useContext(GoogleContext);
  const [service, setService] =
    useState<google.maps.places.PlacesService | null>(null);

  useEffect(() => {
    if (isGoogleLoaded && mapInstance !== null) {
      setService(new google.maps.places.PlacesService(mapInstance));
    }
  }, [isGoogleLoaded, mapInstance, coordinates]);

  return (
    <nav
      className={`${props.className} navbar navbar-expand-lg navbar-light bg-white ${styles.nav}`}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src="/" alt="" width="30" height="24" />
          AllTrails at Lunch
        </a>

        <div className="d-flex">
          <Sort />

          <form
            onSubmit={async (event: FormEvent) => {
              event.preventDefault();

              if (isLoadingResults) {
                return;
              }

              if (service === null || coordinates === null) {
                alert('unknown error');

                return;
              }

              const formData = new FormData(event.target as HTMLFormElement);

              const query = `${formData.get('query') ?? ''}`;

              try {
                dispatch(search({ service, coordinates, query }));
              } catch (error) {
                console.error(`error while searching ${error}`);
              }
            }}
          >
            <div className="input-group">
              <input
                type="text"
                name="query"
                disabled={isLoadingResults || coordinates === null}
                className="form-control"
                placeholder="Search for a restaurant"
                aria-label="Search for a restaurant"
              />
              <button className="btn btn-outline-secondary" type="button">
                <i className="bi bi-search text-primary"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
