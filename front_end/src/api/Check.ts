
import {IBookingData} from '../interface/Checjk';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const CheckingApi = createApi({
    reducerPath: 'bookingtour',
    tagTypes: ['bookingtour'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api",
        fetchFn: async (...args) => {
           
            return fetch(...args);
        }
    }),
    endpoints: (builder) => ({

        getCheckbooktour: builder.query<IBookingData, number >({
            query: (id) => `/bookingtour/${id}` ,
            providesTags: ['bookingtour']
        }),
    

    })
});
export const {
useGetCheckbooktourQuery

} = CheckingApi;
export const CheckingReducer = CheckingApi.reducer;
export default CheckingApi;