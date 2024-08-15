import { Itourdetail } from '../interface/Itourdetail';

import { ITour } from '../interface/tour';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const TourApi = createApi({
    reducerPath: 'Tour',
    tagTypes: ['Tour'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/admin",
        fetchFn: async (...args) => {

            return fetch(...args);
        }
    }),
    endpoints: (builder) => ({
        getTour: builder.query<ITour[], void>({
            query: () => `/tour`,
            providesTags: ['Tour']
        }),
        addTour: builder.mutation<ITour, ITour>({
            query: (Tour) => ({
                url: '/tour',
                method: "POST",
                body: Tour
            }),
            invalidatesTags: ['Tour']
        }),
        editTour: builder.mutation<ITour, ITour>({
            query: (Tour) => ({
                url: `/tour/${Tour.id}`,
                method: "PUT",
                body: Tour
            }),
            invalidatesTags: ['Tour']
        }),
        removeTour: builder.mutation<void, number>({
            query: (id) => ({
                url: `/tour/${id}`,
                method: "DELETE",

            }),
            invalidatesTags: ['Tour']

        }),
        getTourById: builder.query<ITour, number>({
            query: (id) => `/tour/${id}`,
            providesTags: ['Tour']
        }),
        getdetailTourById: builder.query<Itourdetail, number>({
            query: (id) => `/tour/${id}`,
            providesTags: ['Tour']
        }),
        book: builder.query<Itourdetail, number >({
            query: (id) => `/booktour/${id}`,
            providesTags: ['Tour']
        })


    })
});

export const {
    useGetTourQuery,
    useAddTourMutation,
    useEditTourMutation,
    useGetTourByIdQuery,
    useRemoveTourMutation,
    useGetdetailTourByIdQuery,
    useBookQuery,


} = TourApi;
export const tourRedeucer = TourApi.reducer;
export default TourApi;