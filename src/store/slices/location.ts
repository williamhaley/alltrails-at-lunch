import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Serializable representation of coordinates as opposed to GeolocationCoordinates.
export interface Coordinates {
  latitude: number;
  longitude: number;
}

interface LocationState {
  value: number;
  isLoading: boolean;
  coordinates: Coordinates | null;
}

const initialState: LocationState = {
  value: 0,
  isLoading: false,
  coordinates: null,
};

export const getCurrentLocation = createAsyncThunk(
  'location',
  async (thunkAPI) => {
    return new Promise<Coordinates>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          } as Coordinates);
        },
        reject,
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        },
      );
    });
  },
);

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    increment(state) {
      state.value++;
    },
    decrement(state) {
      state.value--;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentLocation.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCurrentLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.coordinates = action.payload;
      })
      .addCase(getCurrentLocation.rejected, (state, action) => {
        console.error(action.payload);
        state.isLoading = false;
      });
  },
});

export const { increment, decrement } = locationSlice.actions;

export const selectCount = (state: RootState) => state.location.value;

export default locationSlice.reducer;