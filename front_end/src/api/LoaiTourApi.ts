import { ILoaiTour } from '../interface/loaiTour';
// import { pause } from '../';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const LoaiTourApi = createApi({
    reducerPath: 'loaitour',
    tagTypes: ['loaitour'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/admin",
        fetchFn: async (...args) => {
           
            return fetch(...args);
        }
    }),
    endpoints: (builder) =>
    // laytour
     ({
        getLoaiTour: builder.query<ILoaiTour[], void>({
            query: () => `/loaitour`,
            providesTags: ['loaitour']
        }),
        addLoaiTour:builder.mutation<ILoaiTour,ILoaiTour>({
            query:(loaiTour)=>({
                url:'/loaitour',
                method: "POST",
                body:loaiTour
        }),
        invalidatesTags: ['loaitour']
        }),
        editLoaiTour:builder.mutation<ILoaiTour,ILoaiTour>({
            query:(loaiTour)=>({
                url:`/loaitour/${loaiTour.id}`,
                method: "PUT",
                body:loaiTour
        }),
        invalidatesTags: ['loaitour']
        }),
        removeLoaiTour:builder.mutation<ILoaiTour,ILoaiTour>({
            query:(id)=>({
                url:`/loaitour/${id}`,
                method: "DELETE",
              
            })
            
        }),
        getLoaiTourById: builder.query<ILoaiTour, number >({
            query: (id) => `/loaitour/${id}` ,
            providesTags: ['loaitour']
        }),

    })
});

export const {
    useGetLoaiTourQuery,
    useAddLoaiTourMutation,
    useEditLoaiTourMutation,
    useGetLoaiTourByIdQuery,
    useRemoveLoaiTourMutation

} = LoaiTourApi;
export const LoaiTourRedeucer = LoaiTourApi.reducer;
export default LoaiTourApi;