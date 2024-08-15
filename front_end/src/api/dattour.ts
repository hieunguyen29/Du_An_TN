
import { Dattour } from '../interface/Dattour';
import { IDattour } from '../interface/IDattour';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const DatourApi = createApi({
    reducerPath: 'getDatTour',
    tagTypes: ['getDatTour'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api",
        fetchFn: async (...args) => {
           
            return fetch(...args);
        }
    }),
    endpoints: (builder) => ({

        getDattourbyId: builder.query<IDattour, number >({
            query: (id) => `/getDatTour/${id}` ,
            providesTags: ['getDatTour']
        }),
        Dattour:builder.mutation<Dattour,Dattour>({
            query:(getDatTour)=>({
                url:'/postDattour',
                method: "POST",
                body:getDatTour
        }),
        invalidatesTags: ['getDatTour']
        }),

    })
});
export const {
useGetDattourbyIdQuery,
useDattourMutation
} = DatourApi;
export const DattourReducer = DatourApi.reducer;
export default DatourApi;