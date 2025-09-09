import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../services/userSlice';
import constructorSlice from './burgerSlice';
import feedSlice from '../services/feedSlice';
import ingredientSlice from '../services/ingredientsSlice';
import orderSlice from '../services/orderSlice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = {
  burgerConstructor: constructorSlice,
  ingredient: ingredientSlice,
  order: orderSlice,
  feed: feedSlice,
  user: userSlice
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook<AppDispatch>();

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
