import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coordinates, Place, SortType } from '../../types';

const MAX_RADIUS_METERS = 2000;

interface PlacesState {
  places: Array<Place>;
  selectedPlace: Place | null;
  isLoading: boolean;
  sort: SortType;
}

const initialState: PlacesState = {
  places: [],
  selectedPlace: null,
  isLoading: false,
  sort: SortType.RatingsDescending,
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
      radius: MAX_RADIUS_METERS,
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
                memo.push({
                  id: next.place_id!,
                  name: next.name!,
                  rating: next.rating!,
                  totalReviews: next.user_ratings_total!,
                  photoUrl: next.photos![0].getUrl({
                    maxWidth: 100,
                    maxHeight: 100,
                  }),
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

const sortPlaces = (places: Array<Place>, sortType: SortType) => {
  places.sort((a, b) => {
    return sortType === SortType.RatingsAscending
      ? a.rating - b.rating
      : b.rating - a.rating;
  });
};

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    selectPlace: (state: PlacesState, action: PayloadAction<Place>) => {
      state.selectedPlace = action.payload;

      return state;
    },
    toggleSort: (state: PlacesState) => {
      state.sort =
        state.sort === SortType.RatingsAscending
          ? SortType.RatingsDescending
          : SortType.RatingsAscending;

      sortPlaces(state.places, state.sort);

      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(search.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(search.fulfilled, (state, action) => {
        state.isLoading = false;

        const newPlaces = action.payload;

        sortPlaces(newPlaces, state.sort);

        // If we had a selection, but the new results negate it, then unset it.
        if (
          state.selectedPlace !== null &&
          !newPlaces.some((place) => place.id === state.selectedPlace!.id)
        ) {
          state.selectedPlace = null;
        }

        state.places = action.payload;
      })
      .addCase(search.rejected, (state, action) => {
        console.error(`error while getting places ${action.payload}`);
        state.isLoading = false;
      });
  },
});

export const { toggleSort, selectPlace } = placesSlice.actions;

export default placesSlice.reducer;
