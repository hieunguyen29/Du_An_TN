import { ITour } from '../interface/tour';
// import { pause } from '../';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const TourApi = createApi({
    reducerPath: 'tour',
    tagTypes: ['Tour'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/admin",
        fetchFn: async (...args) => {
           
            return fetch(...args);
        }
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<ITour[], void>({
            query: () => `/tour`,
            providesTags: ['Tour']
        }),
       

    })
});

export const {
    useGetProductsQuery,

} = TourApi;
export const tourRedeucer = TourApi.reducer;
export default TourApi;