import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import starshipReducer from '../features/starships/starshipSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    starships: starshipReducer
  },
});
