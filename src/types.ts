export interface Place {
  id: string;
  name: string;
  rating: number;
  photoUrl: string;
  priceLevel: number;
  coordinates: Coordinates;
}

// Serializable representation of coordinates as opposed to GeolocationCoordinates.
export interface Coordinates {
  latitude: number;
  longitude: number;
}
