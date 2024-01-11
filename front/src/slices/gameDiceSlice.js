import { createSlice } from '@reduxjs/toolkit';

export const gameDiceSlice = createSlice({
    name: 'gameDice',
    initialState: {
        diceResult: [1,1,1,1,1],
        value: 3,
        frequencyNumber: [0,0,0,0,0,0],
        wonPastries: 0,
    },
    reducers: {
        updateDiceResult: (state, action) => {
            state.diceResult = action.payload;
        },
        updateDiceValue: (state) =>{
            state.value -= 1;
        },
        updateFrequencyNumber: (state, action) => {
            state.frequencyNumber = action.payload;
        },
        updateWonPastries: (state, action) => {
            state.wonPastries = action.payload;
        },
    }
})

export const { updateDiceResult, updateDiceValue, updateFrequencyNumber, updateWonPastries } = gameDiceSlice.actions;
export default gameDiceSlice.reducer;