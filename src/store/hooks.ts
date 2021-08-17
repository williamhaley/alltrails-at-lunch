import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// See https://redux-toolkit.js.org/tutorials/typescript#define-typed-hooks for
// why we use these typed hooks rather than useDispatch, useSelector.

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
