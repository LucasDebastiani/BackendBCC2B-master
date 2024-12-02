import { configureStore } from '@reduxjs/toolkit';
import userReducer from './usuarioSlice';
import chatReducer from './mensagensSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
  },
});
