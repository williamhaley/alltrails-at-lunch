import { createContext, useEffect, useState } from 'react';
import { googleApiKey } from '../config';

interface State {
  isGoogleLoaded: boolean;
  mapInstance: google.maps.Map | null;
  setMapInstance(map: google.maps.Map): void;
}

export const GoogleContext = createContext<State>({
  isGoogleLoaded: false,
  mapInstance: null,
  setMapInstance: () => {},
});

function loadScript(src: string, callback: () => void) {
  var script = document.createElement('script');
  script.setAttribute('src', src);
  script.addEventListener('load', callback);
  document.head.appendChild(script);
}

const GoogleProvider: React.FC = ({ children }) => {
  const [isGoogleLoaded, setIsGoogleLoaded] = useState<boolean>(false);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`,
      () => {
        setIsGoogleLoaded(true);
      },
    );

    return () => {};
  }, []);

  return (
    <GoogleContext.Provider
      value={{ isGoogleLoaded, mapInstance, setMapInstance }}
    >
      {children}
    </GoogleContext.Provider>
  );
};

export default GoogleProvider;
