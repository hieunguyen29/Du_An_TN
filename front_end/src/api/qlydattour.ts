

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IQuanlyDattour } from '../interface/qlytdatour';

const QuanlydattoutApi = createApi({
    reducerPath: 'getListBookingTour',
    tagTypes: ['getListBookingTour'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/admin/dattour",
        fetchFn: async (...args) => {
           
            return fetch(...args);
        }
    }),
    endpoints: (builder) => ({

        getQuanlydattour: builder.query<IQuanlyDattour[], void>({
            query: () => `/getListBookingTour`,
            providesTags: ['getListBookingTour']
        }),
        getQuanlydattourchuathanhtoan: builder.query<IQuanlyDattour[], void>({
            query: () => `/getListBookingTourUnpaid`,
            providesTags: ['getListBookingTour']
        }),
        getListBookingTourPaid: builder.query<IQuanlyDattour[], void>({
            query: () => `/getListBookingTourPaid`,
            providesTags: ['getListBookingTour']
        }),
 


    })
});
export const {
useGetQuanlydattourQuery,
useGetQuanlydattourchuathanhtoanQuery,
useGetListBookingTourPaidQuery
} = QuanlydattoutApi;
export const QuanlydattourReducer = QuanlydattoutApi.reducer;
export default QuanlydattoutApi;