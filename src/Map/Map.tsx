import { useContext, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../store/hooks';
import { Place } from '../store/slices/places';
import { RootState } from '../store/store';
import { GoogleContext } from '../Google/GoogleProvider';
import styles from './Map.module.scss';

interface Selection {
  marker: google.maps.Marker;
  place: Place;
}

const getDetailsContent = (place: Place) => {
  const content = document.createElement('div');

  const nameElement = document.createElement('h2');
  nameElement.textContent = place.name;
  content.appendChild(nameElement);

  const placeIdElement = document.createElement('p');
  placeIdElement.textContent = place.id!;
  content.appendChild(placeIdElement);

  return content;
};

const Map: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const coordinates = useAppSelector(
    (state: RootState) => state.location.coordinates,
  );
  const places = useAppSelector((state: RootState) => state.places.places);

  const [currentSelection, setCurrentSelection] = useState<Selection | null>(
    null,
  );

  const { isGoogleLoaded, mapInstance, setMapInstance } =
    useContext(GoogleContext);

  useEffect(() => {
    if (infoWindowRef.current === null || currentSelection === null) {
      return;
    }

    const content = getDetailsContent(currentSelection.place);

    infoWindowRef.current.setContent(content);
    infoWindowRef.current.open(mapInstance, currentSelection.marker);
  }, [currentSelection, mapInstance]);

  useEffect(() => {
    if (mapInstance === null) {
      return;
    }

    for (const place of places) {
      const marker = new google.maps.Marker({
        map: mapInstance,
        position: new google.maps.LatLng(
          place.coordinates.latitude,
          place.coordinates.longitude,
        ),
      });

      google.maps.event.addListener(marker, 'click', () => {
        setCurrentSelection({
          place,
          marker,
        });
      });
    }
  }, [places, mapInstance]);

  const mapDivRef = useRef<HTMLDivElement | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  // Set the map center
  useEffect(() => {
    if (
      isGoogleLoaded &&
      coordinates !== null &&
      mapInstance === null &&
      mapDivRef.current !== null
    ) {
      if (infoWindowRef.current === null) {
        infoWindowRef.current = new google.maps.InfoWindow();
      }

      const map = new google.maps.Map(mapDivRef.current, {
        center: new google.maps.LatLng(
          coordinates.latitude,
          coordinates.longitude,
        ),
        zoom: 15,
      });

      setMapInstance(map);
    }
  }, [isGoogleLoaded, mapInstance, setMapInstance, coordinates]);

  const isLoading = coordinates === null;

  return (
    <div
      id="map"
      className={`${props.className} ${styles.map}`}
      ref={mapDivRef}
    >
      {isLoading && <div>Loading...</div>}
    </div>
  );
};

export default Map;
