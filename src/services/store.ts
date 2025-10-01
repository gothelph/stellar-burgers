import { combineReducers, configureStore } from '@reduxjs/toolkit';
import ingredientsSlice from './slices/ingredients';
import burgerConstructorSlice from './slices/burger-constructor';
import orderSlice from './slices/order';
import feedSlice from './slices/feed';
import userSlice from './slices/userSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  burgerConstructor: burgerConstructorSlice.reducer,
  orders: orderSlice.reducer,
  user: userSlice.reducer,
  feed: feedSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
