import { FormEvent, useContext, useEffect, useState } from 'react';
import { search } from '../SearchBox/search';
import styles from './NavBar.module.scss';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { RootState } from '../store/store';
import { GoogleContext } from '../Google/GoogleProvider';
import { replace } from '../store/slices/places';

const NavBar: React.FC<React.HTMLAttributes<HTMLElement>> = (props) => {
  const coordinates = useAppSelector(
    (state: RootState) => state.location.coordinates,
  );
  const dispatch = useAppDispatch();

  const { isGoogleLoaded, mapInstance } = useContext(GoogleContext);

  useEffect(() => {
    if (isGoogleLoaded && mapInstance !== null) {
      setService(new google.maps.places.PlacesService(mapInstance));
    }
  }, [isGoogleLoaded, mapInstance, coordinates]);

  const [service, setService] =
    useState<google.maps.places.PlacesService | null>(null);

  return (
    <nav
      className={`${props.className} navbar navbar-expand-lg navbar-light bg-light ${styles.nav}`}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src="/" alt="" width="30" height="24" />
          AllTrails at Lunch
        </a>

        <form
          className="d-flex"
          onSubmit={async (event: FormEvent) => {
            event.preventDefault();

            if (service === null || coordinates === null) {
              alert('unknown error');

              return;
            }

            const formData = new FormData(event.target as HTMLFormElement);

            const query = `${formData.get('query') ?? ''}`;

            try {
              const results = await search(service, coordinates, query);

              dispatch(replace(results));
            } catch (error) {
              console.error(error);
            }
          }}
        >
          <button className="btn btn-outline-success me-2" type="submit">
            Filter
          </button>
          <div className="input-group">
            <input
              type="text"
              name="query"
              className="form-control"
              placeholder="Search for a restaurant"
              aria-label="Search for a restaurant"
            />
            <button className="btn btn-outline-secondary" type="button">
              <i className="bi bi-search"></i>
            </button>
          </div>
        </form>
      </div>
    </nav>
  );
};

export default NavBar;
