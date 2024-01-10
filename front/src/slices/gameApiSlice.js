import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const gameApiSlice = createApi({
    reducerPath: 'gameApi',
    baseQuery: fetchBaseQuery({ baseUrl : 'http://localhost:3001' }),
    endpoints: (builder) => ({
        getPastries : builder.query({
            query: () => '/game/pastries'
        }),
        getPastriesWon : builder.query({
            query: (quantity) => `/game/win-pastries/${quantity}`
        }),
        postLogin: builder.mutation({
            query: (data) => ({
                url: '/login',
                method: 'POST',
                body: data,
                credentials: 'include'
            }) 
        }),
        getMe: builder.query({
            query: () => '/me',
            credentials: 'include'
        })
    })
})

export const { useGetPastriesQuery, useGetPastriesWonQuery, usePostLoginMutation, useGetMeQuery } = gameApiSlice;