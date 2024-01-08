import { configureStore } from '@reduxjs/toolkit'
import { gameApiSlice } from '../slices/gameApiSlice'

export default configureStore({
    reducer: {
        'gameApi': gameApiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(gameApiSlice.middleware)
    }
})