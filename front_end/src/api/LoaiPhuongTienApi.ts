import { ILoaiPhuongTien } from '../interface/loaiphuongtien';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const LoaiPhuongTienApi = createApi({
    reducerPath: 'loaiphuongtien',
    tagTypes: ['LoaiPhuongTien'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/admin",
        fetchFn: async (...args) => {
           
            return fetch(...args);
        }
    }),
    endpoints: (builder) => ({
        getLoaiPhuongTien: builder.query<ILoaiPhuongTien[], void>({
            query: () => `/phuongtien`,
            providesTags: ['LoaiPhuongTien']
        }),
        addLoaiPhuongTien:builder.mutation<ILoaiPhuongTien,ILoaiPhuongTien>({
            query:(LoaiPhuongTien)=>({
                url:'/phuongtien',
                method: "POST",
                body:LoaiPhuongTien
        }),
        invalidatesTags: ['LoaiPhuongTien']
        }),
        editLoaiPhuongTien:builder.mutation<ILoaiPhuongTien,ILoaiPhuongTien>({
            query:(LoaiPhuongTien)=>({
                url:`/phuongtien/${LoaiPhuongTien.id}`,
                method: "PUT",
                body:LoaiPhuongTien
        }),
        invalidatesTags: ['LoaiPhuongTien']
        }),
         removeLoaiPhuongTien:builder.mutation<ILoaiPhuongTien,ILoaiPhuongTien>({
             query:(id)=>({
                 url:`/phuongtien/${id}`,
                method: "DELETE",
           
            })
            
        }),
        getLoaiPhuongTienById: builder.query<ILoaiPhuongTien, number >({
            query: (id) => `/phuongtien/${id}` ,
            providesTags: ['LoaiPhuongTien']
        }),
       

    })
});
export const {
    useGetLoaiPhuongTienQuery,
    useAddLoaiPhuongTienMutation,
    useEditLoaiPhuongTienMutation,
    useGetLoaiPhuongTienByIdQuery,
    useRemoveLoaiPhuongTienMutation,

} = LoaiPhuongTienApi;
export const LoaiPhuongTienRedeucer = LoaiPhuongTienApi.reducer;
export default LoaiPhuongTienApi;