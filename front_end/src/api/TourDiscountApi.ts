import { ITourDiscount } from '../interface/tourdiscount';
// import { pause } from '../';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const TourDiscountApi = createApi({
    reducerPath: 'tourdiscount',
    tagTypes: ['Tourdiscount'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/admin",
        fetchFn: async (...args) => {

            return fetch(...args);
        }
    }),
    endpoints: (builder) => ({
        getTourDiscount: builder.query<ITourDiscount[], void>({
            query: () => `/tour_discount`,
            providesTags: ['Tourdiscount']
        }),

        addTourDiscount: builder.mutation<ITourDiscount, ITourDiscount>({
            query: (tourdiscount) => ({
                url: '/tour_discount',
                method: "POST",
                body: tourdiscount
            }),
            invalidatesTags: ['Tourdiscount']
        }),
        editTourDiscount: builder.mutation<ITourDiscount, ITourDiscount>({
            query: (tourimages) => ({
                url: `tour_discount/update/${tourimages.id}`,
                method: "PUT",
                body: tourimages
            }),
            invalidatesTags: ['Tourdiscount']
        }),
        removeTourDiscount: builder.mutation<ITourDiscount, ITourDiscount>({
            query: (id) => ({
                url: `/tour_discount/${id}`,
                method: "DELETE",

            })

        }),
        getTourDiscountById: builder.query<ITourDiscount, number>({
            query: (id) => `/tour_discount/${id}`,
            providesTags: ['Tourdiscount']
        }),
    })
});

export const {
    useGetTourDiscountQuery,
    useAddTourDiscountMutation,
    useEditTourDiscountMutation,
    useGetTourDiscountByIdQuery,
    useRemoveTourDiscountMutation

} = TourDiscountApi;
export const TourDiscountRedeucer = TourDiscountApi.reducer;
export default TourDiscountApi;