import { configureStore } from '@reduxjs/toolkit';
import translationReducer from './translationSlice';

export const store = configureStore({
  reducer: {
    translation: translationReducer,
  },
});
