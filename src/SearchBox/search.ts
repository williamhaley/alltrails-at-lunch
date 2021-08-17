import { Coordinates } from '../store/slices/location';
import { Place } from '../store/slices/places';

export const search = async (
  service: google.maps.places.PlacesService,
  coordinates: Coordinates,
  query: string,
): Promise<Array<Place>> => {
  // https://developers.google.com/maps/documentation/javascript/places#place_searches
  const request = {
    location: new google.maps.LatLng(
      coordinates.latitude,
      coordinates.longitude,
    ),
    keyword: query,
    radius: 50,
    type: 'restaurant',
  };

  return new Promise<Array<Place>>((resolve, reject) => {
    service.nearbySearch(
      request,
      (
        results: Array<google.maps.places.PlaceResult> | null,
        status: google.maps.places.PlacesServiceStatus,
      ) => {
        const statusOK = status === google.maps.places.PlacesServiceStatus.OK;

        if (!statusOK || !results) {
          console.warn(`no results [status=${status}] for ${query}`);

          return reject(new Error('no results'));
        }

        const places: Array<Place> = results.reduce(
          (
            memo: Array<Place>,
            next: google.maps.places.PlaceResult,
          ): Array<Place> => {
            // TODO WFH How often do we actually not have these fields? If
            // Google is marking them optional I'm assuming that's realistic.
            if (next.geometry!.location) {
              console.log(next);

              memo.push({
                id: next.place_id!,
                name: next.name!,
                rating: next.rating!,
                photoUrl: next.photos![0].getUrl(),
                priceLevel: next.price_level!,
                coordinates: {
                  latitude: next.geometry!.location.lat(),
                  longitude: next.geometry!.location.lng(),
                },
              });
            }

            return memo;
          },
          [],
        );

        return resolve(places);
      },
    );
  });
};
