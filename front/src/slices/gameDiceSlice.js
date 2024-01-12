import { createSlice } from '@reduxjs/toolkit';

export const gameDiceSlice = createSlice({
    name: 'gameDice',
    initialState: {
        diceResult: [1,1,1,1,1],
        value: 3,
        frequencyNumber: [0,0,0,0,0,0],
        wonPastries: 0,
        hasStarted: false,
        showResult: false,
        rewardPastries: null,
    },
    reducers: {
        updateDiceResult: (state) => {
            state.diceResult = Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1);
            state.value -= 1;
        },
        updateFrequencyNumber: (state, action) => {
            state.frequencyNumber = [0,0,0,0,0,0];
            action.payload.forEach((number) => {
                state.frequencyNumber[number - 1] += 1;
            });
        },
        updateWonPastries: (state) => {
            state.wonPastries = Math.max(...state.frequencyNumber);
            console.log(state.wonPastries);
        },
        updateHasStarted: (state) => {
            state.hasStarted = true;
        },
        updateShowResult: (state) => {
            state.showResult = true;
        },
        updateRewardPastries: (state, action) => {
            state.rewardPastries = action.payload;
        },
    }
})

export const { 
    updateDiceResult, 
    updateFrequencyNumber, 
    updateWonPastries, 
    updateHasStarted, 
    updateShowResult,
    updateRewardPastries,
} = gameDiceSlice.actions;
export default gameDiceSlice.reducer;