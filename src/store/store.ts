import {configureStore} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from './slices/authSlice';
import bookingReducer from './slices/bookingSlice';

// Persist configuration for bookingReducer
const bookingPersistConfig = {
  key: 'booking',
  storage,
};

const persistedBookingReducer = persistReducer(bookingPersistConfig, bookingReducer);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    booking: persistedBookingReducer, // Use the persisted reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store); // Create the persistor

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 