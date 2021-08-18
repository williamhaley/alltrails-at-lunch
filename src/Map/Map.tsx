import { createRef, useContext, useEffect, useReducer, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { RootState } from '../store/store';
import { GoogleContext } from '../Google/GoogleProvider';
import { selectPlace } from '../store/slices/places';
import InfoWindowContent from './InfoWindowContent';

interface MarkerState {
  oldByPlaceId: { [key: string]: google.maps.Marker };
  currentByPlaceId: { [key: string]: google.maps.Marker };
}

const Map: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  const dispatch = useAppDispatch();

  const { coordinates, isLoadingPlaces, places, selectedPlace } =
    useAppSelector((state: RootState) => {
      return {
        coordinates: state.location.coordinates,
        isLoadingPlaces: state.places.isLoading,
        places: state.places.places,
        selectedPlace: state.places.selectedPlace,
      };
    });

  const infoWindowContentRef = createRef<HTMLDivElement>();

  const [markerState, updateMarkers] = useReducer(
    (state: MarkerState, newPlaces: { [key: string]: google.maps.Marker }) => {
      return {
        oldByPlaceId: state.currentByPlaceId,
        currentByPlaceId: newPlaces,
      };
    },
    { oldByPlaceId: {}, currentByPlaceId: {} },
  );

  // Immediately clear markers when a search is performed.
  useEffect(() => {
    if (isLoadingPlaces) {
      updateMarkers({});
    }
  }, [isLoadingPlaces]);

  const { isGoogleLoaded, mapInstance, setMapInstance } =
    useContext(GoogleContext);

  // Clear old markers as needed.
  useEffect(() => {
    for (const marker of Object.values(markerState.oldByPlaceId)) {
      marker.setMap(null);
    }
  }, [markerState, markerState.oldByPlaceId]);

  useEffect(() => {
    if (
      infoWindowRef.current === null ||
      selectedPlace === null ||
      infoWindowContentRef.current === null
    ) {
      return;
    }

    const selectedMarker = markerState.currentByPlaceId[selectedPlace.id];

    infoWindowRef.current.setContent(infoWindowContentRef.current);
    infoWindowRef.current.open(mapInstance, selectedMarker);
  }, [
    selectedPlace,
    places,
    mapInstance,
    markerState.currentByPlaceId,
    infoWindowContentRef,
  ]);

  useEffect(() => {
    if (mapInstance === null) {
      return;
    }

    const newMarkers = {} as { [key: string]: google.maps.Marker };

    for (const place of places) {
      const marker = new google.maps.Marker({
        map: mapInstance,
        position: new google.maps.LatLng(
          place.coordinates.latitude,
          place.coordinates.longitude,
        ),
      });

      google.maps.event.addListener(marker, 'click', () => {
        dispatch(selectPlace(place));
      });

      newMarkers[place.id] = marker;
    }

    updateMarkers(newMarkers);
  }, [dispatch, places, mapInstance]);

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

      {selectedPlace !== null && (
        <InfoWindowContent ref={infoWindowContentRef} place={selectedPlace} />
      )}
    </div>
  );
};

export default Map;
