import { configureStore } from '@reduxjs/toolkit'
import { gameApiSlice } from '../slices/gameApiSlice'
import { gameAuthReducer } from '../slices/gameAuthSlice'

export default configureStore({
    reducer: {
        'gameApi': gameApiSlice.reducer,
        'gameAuth': gameAuthReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(gameApiSlice.middleware)
    }
})