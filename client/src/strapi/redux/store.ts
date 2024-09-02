/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';

const initialState = {
  configuration: {
    baseUrl: 'http://localhost:1337/api' // Default base URL
  }
};

const configurationReducer = (state = initialState.configuration, action: any) => {
  switch (action.type) {
    case 'configuration/updateBaseUrl':
      return {
        ...state,
        baseUrl: action.payload
      };
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    configuration: configurationReducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});

// initializeApp();
