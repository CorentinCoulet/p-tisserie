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
        selectedDice: [],
        rollingDice: true,
        canRollDice: true,
    },
    reducers: {
        updateDiceResult: (state) => {
            const newDiceResult = state.diceResult.map((die, index) => {
                return state.selectedDice.includes(index) ? die : Math.floor(Math.random() * 6) + 1;
            });
            state.diceResult = newDiceResult;
            state.value -= 1;
        },
        updateFrequencyNumber: (state) => {
            state.frequencyNumber = [0,0,0,0,0,0];
            state.diceResult.forEach((number) => {
                state.frequencyNumber[number - 1] += 1;
            });
        },
        updateWonPastries: (state) => {
            state.wonPastries = Math.max(...state.frequencyNumber);
        },
        updateHasStarted: (state) => {
            state.hasStarted = true;
        },
        updateShowResult: (state) => {
            state.showResult = true;
        },
        updateSelectedDice: (state, action) => {
            state.selectedDice = action.payload.map(Number);
        },
        updateRollingDice : (state) => {
            state.rollingDice = false;
        },
        updateCanRollDice : (state) => {
            state.canRollDice = false;
        }
    }
})

export const { 
    updateDiceResult, 
    updateFrequencyNumber, 
    updateWonPastries, 
    updateHasStarted, 
    updateShowResult,
    updateSelectedDice,
    updateRollingDice,
    updateCanRollDice
} = gameDiceSlice.actions;
export default gameDiceSlice.reducer;