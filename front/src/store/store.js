import { configureStore } from '@reduxjs/toolkit'
import { gameApiSlice } from '../slices/gameApiSlice'
import { gameAuthReducer } from '../slices/gameAuthSlice'
import { gameDiceSlice } from '../slices/gameDiceSlice'

export default configureStore({
    reducer: {
        'gameApi': gameApiSlice.reducer,
        'gameAuth': gameAuthReducer,
        'gameDice': gameDiceSlice.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(gameApiSlice.middleware)
    }
})