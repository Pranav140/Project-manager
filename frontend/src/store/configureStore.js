import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/index';

export default function createAppStore() {
  return configureStore({
    reducer: rootReducer,
  });
}