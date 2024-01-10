import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
};

const gameAuthSlice = createSlice({
  name: 'gameAuth',
  initialState,
  reducers: {
    setLoggedIn: (state) => {
      state.isLoggedIn = true;
    },
    setLoggedOut: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { reducer: gameAuthReducer, actions: { setLoggedIn, setLoggedOut } } = gameAuthSlice;
