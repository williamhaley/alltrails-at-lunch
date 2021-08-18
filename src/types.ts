export interface Place {
  id: string;
  name: string;
  rating: number;
  totalReviews: number;
  photoUrl: string;
  priceLevel: number;
  coordinates: Coordinates;
}

// Serializable representation of coordinates as opposed to GeolocationCoordinates.
export interface Coordinates {
  latitude: number;
  longitude: number;
}

export enum SortType {
  RatingsDescending,
  RatingsAscending,
}

export enum PlaceCardType {
  map,
}
