import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const gameApiSlice = createApi({
    reducerPath: 'gameApi',
    baseQuery: fetchBaseQuery({ baseUrl : 'http://localhost:3001' }),
    tagTypes: ['User', 'Pastries'],
    endpoints: (builder) => ({

        getPastries : builder.query({
            query: () => '/game/pastries',
            providesTags: ['Pastries'],
        }),

        getPastriesWon : builder.query({
            query: (quantity) => `/game/win-pastries/${quantity}`
        }),

        // LOGIN
        postLogin: builder.mutation({
            query: (data) => ({
                url: '/login',
                method: 'POST',
                body: data,
                credentials: 'include',
            }),
            invalidatesTags: ['User'],
        }),

        // LOGOUT
        getLogout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'GET',
                credentials: 'include',
            }),
            invalidatesTags: ['User'],
        }),

        // ME
        getMe: builder.query({
            query: () => ({
               url: '/me',
               credentials: 'include',
            }),
            providesTags: ['User'],
        }),

        // UPDATE
        updatePastry: builder.mutation({
            query: (data) => ({
                url: `/api/pastrie/${data.id}`,
                method: 'PUT',
                body: data,
                credentials: 'include'
            }),
            invalidatesTags: ['Pastries'],
        }),

        // DELETE
        deletePastry: builder.mutation({
            query: (id) => ({
                url: `/api/pastrie/${id}`,
                method: 'DELETE',
                credentials: 'include'
            }),
            invalidatesTags: ['Pastries'],
        }),

        // AJOUT
        postPastry: builder.mutation({
            query: (data) => ({
                url: '/api/pastrie',
                method: 'POST',
                body: data,
                credentials: 'include'
            }),
            invalidatesTags: ['Pastries'],
        }),
    })
})

export const {  
    useGetPastriesQuery, 
    useGetPastriesWonQuery, 
    usePostLoginMutation, 
    useGetLogoutMutation,
    useGetMeQuery,
    useUpdatePastryMutation,
    useDeletePastryMutation,
    usePostPastryMutation
} = gameApiSlice;