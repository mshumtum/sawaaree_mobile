import { createAsyncThunk, createSlice, Dispatch } from "@reduxjs/toolkit";
import ApiClient from "../../services/ApiClient";
import { API_ENDPOINTS } from "../../services/endpoints";
import { RootState } from "../store";

interface BookingState {
  booking: any;
  loading: boolean;
  error: string | null;
  myLocation: {
    latitude: number;
    longitude: number;
    name: string;
    address: string;
  };
  destinationLocation: {
    latitude: number;
    longitude: number;
    name: string;
    address: string;
  };
  nearbyLocations: any[];
}

const initialState: BookingState = {
  booking: null,
  loading: false,
  error: null,
  myLocation: {
    latitude: 0,
    longitude: 0,
    name: '',
    address: '',
  },
  destinationLocation: {
    latitude: 0,
    longitude: 0,
    name: '',
    address: '',
  },
  nearbyLocations: [],
};

export const getNearbyLocations = createAsyncThunk(
  'booking/getNearbyLocations',
  async (_, {rejectWithValue, getState, dispatch}) => {
    try {
      const myLocation = (getState() as RootState).booking.myLocation;
      const response: any = await ApiClient.post(
        API_ENDPOINTS.BOOKING.GET_NEARBY_LOCATIONS, 
        {
          lat: myLocation.latitude,
          long: myLocation.longitude,
        },
      );
      dispatch(setNearbyLocations(response.locations));
      getAddressFromLatLng(myLocation.latitude, myLocation.longitude, dispatch)
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to get nearby locations');
    }
  },
);

export const getAddressFromLatLng = async (latitude: number, longitude: number, dispatch: any) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
  const response = await fetch(url);
  const data = await response.json();
  dispatch(setMyLocation({
    address : data?.display_name,
    name: data?.display_name?.split(',')[0],
    latitude: latitude,
    longitude: longitude,
  }));
};

export const getLocationFromAddress = async (address: string) => {
  const url = `https://nominatim.openstreetmap.org/search?q=${address}&format=json`;
  const response = await fetch(url);
  const data = await response.json();
  console.log('data>>>', data);
  return data;
}


const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setMyLatLong: (state, action) => {
      state.myLocation.latitude = action.payload.latitude;
      state.myLocation.longitude = action.payload.longitude;
    },
    setMyLocation: (state, action) => {
      state.myLocation = action.payload;
    },
    setDestinationLocation: (state, action) => {
      state.destinationLocation = action.payload;
    },
    setNearbyLocations: (state, action) => {
      state.nearbyLocations = action.payload;
    },
  },
});

export const {setMyLocation, setMyLatLong, setDestinationLocation, setNearbyLocations} = bookingSlice.actions;
export default bookingSlice.reducer;