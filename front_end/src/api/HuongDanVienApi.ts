import { IHuongDanVien } from '../interface/huongDanVien';
// import { pause } from '../';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const HuongDanVienApi = createApi({
    reducerPath: 'huongdanvien',
    tagTypes: ['huongdanvien'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/admin",
        fetchFn: async (...args) => {
           
            return fetch(...args);
        }
    }),
    endpoints: (builder) => ({
        getHuongDanVien: builder.query<IHuongDanVien[], void>({
            query: () => `/huongdanvien`,
            providesTags: ['huongdanvien']
        }),
        addHuongDanVien:builder.mutation<IHuongDanVien,IHuongDanVien>({
            query:(huongDanVien)=>({
                url:'/huongdanvien',
                method: "POST",
                body:huongDanVien
        }),
        invalidatesTags: ['huongdanvien']
        }),
        editHuongDanVien:builder.mutation<IHuongDanVien,IHuongDanVien>({
            query:(huongDanVien)=>({
                url:`/huongdanvien/${huongDanVien.id}`,
                method: "PUT",
                body:huongDanVien
        }),
        invalidatesTags: ['huongdanvien']
        }),
        removeHuongDanVien:builder.mutation<IHuongDanVien,IHuongDanVien>({
            query:(id)=>({
                url:`/huongdanvien/${id}`,
                method: "DELETE",
              
            })
            
        }),
        getHuongDanVienById: builder.query<IHuongDanVien, number >({
            query: (id) => `/huongdanvien/${id}` ,
            providesTags: ['huongdanvien']
        }),

    })
});

export const {
    useGetHuongDanVienQuery,
    useEditHuongDanVienMutation,
    useGetHuongDanVienByIdQuery,
    useAddHuongDanVienMutation,
    useRemoveHuongDanVienMutation

} = HuongDanVienApi;
export const HuongDanVienRedeucer = HuongDanVienApi.reducer;
export default HuongDanVienApi;