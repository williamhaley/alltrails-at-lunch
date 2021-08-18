import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { useAppSelector } from '../store/hooks';
import { RootState } from '../store/store';
import { GoogleContext } from '../Google/GoogleProvider';
import { Place } from '../types';

interface Selection {
  marker: google.maps.Marker;
  place: Place;
}

interface MarkerState {
  old: Array<google.maps.Marker>;
  new: Array<google.maps.Marker>;
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
  const { coordinates, isLoadingPlaces, places } = useAppSelector(
    (state: RootState) => {
      return {
        coordinates: state.location.coordinates,
        isLoadingPlaces: state.places.isLoading,
        places: state.places.places,
      };
    },
  );

  const [currentSelection, setCurrentSelection] = useState<Selection | null>(
    null,
  );
  const [markerState, updateMarkers] = useReducer(
    (state: MarkerState, action: any) => {
      return {
        old: state.new,
        new: action,
      };
    },
    { old: [], new: [] },
  );

  // Immediately clear markers when a search is performed.
  useEffect(() => {
    if (isLoadingPlaces) {
      updateMarkers([]);
    }
  }, [isLoadingPlaces]);

  const { isGoogleLoaded, mapInstance, setMapInstance } =
    useContext(GoogleContext);

  // Clear old markers as needed.
  useEffect(() => {
    if (markerState.old.length > 0) {
      for (const marker of markerState.old) {
        marker.setMap(null);
      }
    }
  }, [markerState, markerState.old]);

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

    const newMarkers = [];

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

      newMarkers.push(marker);
    }

    updateMarkers(newMarkers);
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
    <div id="map" className={`${props.className} w-100 h-100`} ref={mapDivRef}>
      {isLoading && <div>Loading...</div>}
    </div>
  );
};

export default Map;
