import { ILichTrinh } from '../interface/lichtrinh';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const LichTrinhApi = createApi({
    reducerPath: 'lichtrinh',
    tagTypes: ['lichtrinh'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/admin",
        fetchFn: async (...args) => {

            return fetch(...args);
        }
    }),
    endpoints: (builder) => ({
        getLichTrinh: builder.query<ILichTrinh[], void>({
            query: () => `/lichtrinh`,
            providesTags: ['lichtrinh']
        }),
        addLichTrinh: builder.mutation<ILichTrinh, ILichTrinh>({
            query: (lichtrinh) => ({
                url: '/lichtrinh',
                method: "POST",
                body: lichtrinh
            }),
            invalidatesTags: ['lichtrinh']
        }),
        editLichTrinh: builder.mutation<ILichTrinh, ILichTrinh>({
            query: (lichtrinh) => ({
                url: `/lichtrinh/${lichtrinh.id}`,
                method: "PUT",
                body: lichtrinh
            }),
            invalidatesTags: ['lichtrinh']
        }),
        removeLichTrinh: builder.mutation<ILichTrinh, ILichTrinh>({
            query: (id) => ({
                url: `/lichtrinh/${id}`,
                method: "DELETE",

            })

        }),
        getLichTrinhId: builder.query<ILichTrinh, number>({
            query: (id) => `/lichtrinh/${id}`,
            providesTags: ['lichtrinh']
        }),


    })
});
export const {
    useGetLichTrinhQuery,
    useAddLichTrinhMutation,
    useEditLichTrinhMutation,
    useGetLichTrinhIdQuery,
    useRemoveLichTrinhMutation
} = LichTrinhApi;
export const LichTrinhRedeucer = LichTrinhApi.reducer;
export default LichTrinhApi;