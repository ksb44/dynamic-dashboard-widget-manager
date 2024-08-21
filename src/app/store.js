import { configureStore } from '@reduxjs/toolkit';
import widgetsReducer from '../features/widgetsSlice';

export const store = configureStore({
  reducer: {
    widgets: widgetsReducer,
  },
});
