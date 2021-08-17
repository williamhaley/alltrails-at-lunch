import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Coordinates } from './location';

export interface Place {
  id: string;
  name: string;
  rating: number;
  photoUrl: string;
  priceLevel: number;
  coordinates: Coordinates;
}

interface ResultsState {
  places: Array<Place>;
}

const initialState: ResultsState = {
  places: [],
};

const placesSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    replace(state, action: PayloadAction<Array<Place>>) {
      state.places = [...action.payload];
    },
  },
});

export const { replace } = placesSlice.actions;

export default placesSlice.reducer;
