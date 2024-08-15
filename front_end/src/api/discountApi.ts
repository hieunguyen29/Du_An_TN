import { IDiscount } from '../interface/discount';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const DiscountApi = createApi({
    reducerPath: 'discount',
    tagTypes: ['Discount'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/admin",
        fetchFn: async (...args) => {

            return fetch(...args);
        }
    }),
    endpoints: (builder) => ({
        getDiscount: builder.query<IDiscount[], void>({
            query: () => `/discount`,
            providesTags: ['Discount']
        }),
        addDiscount: builder.mutation<IDiscount, IDiscount>({
            query: (discount) => ({
                url: '/discount',
                method: "POST",
                body: discount
            }),
            invalidatesTags: ['Discount']
        }),
        editDiscount: builder.mutation<IDiscount, IDiscount>({
            query: (discount) => ({
              url: `/discount/update/${discount.id}`,
              method: "PUT",
              body: discount
            }),
            invalidatesTags: ['Discount']
          }),
        removeDiscount: builder.mutation<IDiscount, IDiscount>({
            query: (id) => ({
                url: `/discount/${id}`,
                method: "DELETE",
            })

        }),
        getDiscountById: builder.query<IDiscount, number>({
            query: (id) => `/discount/${id}`,
            providesTags: ['Discount']
        }),


    })
});
export const {
    useGetDiscountQuery,
    useAddDiscountMutation,
    useGetDiscountByIdQuery,
    useEditDiscountMutation,
    useRemoveDiscountMutation,

} = DiscountApi;
export const DiscountRedeucer = DiscountApi.reducer;
export default DiscountApi;