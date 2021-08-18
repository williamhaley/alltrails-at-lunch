// Redux Toolkit is our official, opinionated, batteries-included toolset for efficient Redux development. It is intended to be the standard way to write Redux logic, and we strongly recommend that you use it.
// https://redux.js.org/redux-toolkit/overview
import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './slices/favorites';
import locationReducer from './slices/location';
import placesReducer from './slices/places';

export const store = configureStore({
  reducer: {
    location: locationReducer,
    places: placesReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
