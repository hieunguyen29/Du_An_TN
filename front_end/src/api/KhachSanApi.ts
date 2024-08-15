import { IKhachSan } from '../interface/khachsan';
// import { pause } from '../';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const KhachSanApi = createApi({
    reducerPath: 'khachsan',
    tagTypes: ['khachsan'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/admin",
        fetchFn: async (...args) => {
           
            return fetch(...args);
        }
    }),
    endpoints: (builder) =>
    // laytour
     ({
        getKhachSan: builder.query<IKhachSan[], void>({
            query: () => `/khachsan`,
            providesTags: ['khachsan']
        }),
        addKhachSan:builder.mutation<IKhachSan,IKhachSan>({
            query:(khachsan)=>({
                url:'/khachsan',
                method: "POST",
                body:khachsan
        }),
        invalidatesTags: ['khachsan']
        }),
        editKhachSan:builder.mutation<IKhachSan,IKhachSan>({
            query:(khachsan)=>({
                url:`/khachsan/${khachsan.id}`,
                method: "PUT",
                body:khachsan
        }),
        invalidatesTags: ['khachsan']
        }),
        removeKhachSan:builder.mutation<IKhachSan,IKhachSan>({
            query:(id)=>({
                url:`/khachsan/${id}`,
                method: "DELETE",
              
            })
            
        }),
        getKhachSanById: builder.query<IKhachSan, number >({
            query: (id) => `/khachsan/${id}` ,
            providesTags: ['khachsan']
        }),

    })
});

export const {
    useGetKhachSanQuery,
    useAddKhachSanMutation,
    useEditKhachSanMutation,
    useGetKhachSanByIdQuery,
    useRemoveKhachSanMutation
   

} = KhachSanApi;
export const KhachSanRedeucer = KhachSanApi.reducer;
export default KhachSanApi;