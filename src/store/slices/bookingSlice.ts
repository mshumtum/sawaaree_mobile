import { createSlice } from "@reduxjs/toolkit";

interface BookingState {
  booking: any;
  loading: boolean;
  error: string | null;
  myLocation: {
    latitude: number;
    longitude: number;
  };
  destinationLocation: {
    latitude: number;
    longitude: number;
  };
}

const initialState: BookingState = {
  booking: null,
  loading: false,
  error: null,
  myLocation: {
    latitude: 0,
    longitude: 0,
  },
  destinationLocation: {
    latitude: 0,
    longitude: 0,
  },
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {},
});

export default bookingSlice.reducer;