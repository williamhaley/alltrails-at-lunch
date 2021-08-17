import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Coordinates, Place } from '../../types';

interface ResultsState {
  places: Array<Place>;
  isLoading: boolean;
}

const initialState: ResultsState = {
  places: [],
  isLoading: false,
};

interface SearchArguments {
  service: google.maps.places.PlacesService;
  coordinates: Coordinates;
  query: string;
}

export const search = createAsyncThunk(
  'places/search',
  async ({
    coordinates,
    service,
    query,
  }: SearchArguments): Promise<Array<Place>> => {
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
          const expectedStatus = [
            google.maps.places.PlacesServiceStatus.OK,
            google.maps.places.PlacesServiceStatus.ZERO_RESULTS,
          ].includes(status);

          if (!expectedStatus) {
            console.error(`unexpected status when searching ${status}`);

            return reject(new Error('unknown error'));
          }

          if (!results || results.length === 0) {
            console.warn(`no results [status=${status}] for ${query}`);

            return resolve([]);
          }

          const places: Array<Place> = results.reduce(
            (
              memo: Array<Place>,
              next: google.maps.places.PlaceResult,
            ): Array<Place> => {
              // TODO WFH How often do we actually not have these fields? If
              // Google is marking them optional I'm assuming that's realistic.
              if (next.geometry!.location) {
                console.log('yo', next);

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
  },
);

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(search.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(search.fulfilled, (state, action) => {
        state.isLoading = false;
        state.places = action.payload;
      })
      .addCase(search.rejected, (state, action) => {
        console.error(`error while getting results ${action.payload}`);
        state.isLoading = false;
      });
  },
});

export default placesSlice.reducer;
