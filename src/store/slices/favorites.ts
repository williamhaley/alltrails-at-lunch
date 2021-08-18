import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const LOCAL_STORAGE_KEY = 'favorites';

interface FavoritesState {
  byId: { [key: string]: boolean };
}

const loadLocalStorageFavorites = () => {
  return JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEY) ?? JSON.stringify({}),
  );
};

const initialState: FavoritesState = {
  byId: loadLocalStorageFavorites(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state: FavoritesState, action: PayloadAction<string>) => {
      const placeId = action.payload;

      // Local state update.
      const currentState = state.byId[placeId] ?? false;
      const newState = !currentState;
      state.byId[placeId] = newState;

      // Canonical state update..
      const favorites = loadLocalStorageFavorites();
      favorites[placeId] = newState;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favorites));

      // Return local state.
      return state;
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
