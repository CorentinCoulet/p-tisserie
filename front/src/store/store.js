import { configureStore } from '@reduxjs/toolkit'
import { gameApiSlice, gameAuthSlice } from '../slices/gameApiSlice'

export default configureStore({
    reducer: {
        'gameApi': gameApiSlice.reducer,
        'gameAuth': gameAuthSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(gameApiSlice.middleware)
    }
})