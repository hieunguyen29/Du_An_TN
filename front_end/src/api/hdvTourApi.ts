import { IHuongDanVien } from '../interface/huongDanVien';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const HuongDanVienTourApi = createApi({
    reducerPath: 'hdvtour',
    tagTypes: ['hdvtour'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/",
        prepareHeaders: (headers, { getState }) => {
            // Kiểm tra mã thông báo từ local storage hoặc nơi lưu trữ khác
            const token = localStorage.getItem('token');

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getHuongDanVien: builder.query<IHuongDanVien[], void>({
            query: () => `hdvtour/getListHDVTour`,
            providesTags: ['hdvtour']
        })
    })
});

export const {
    useGetHuongDanVienQuery,

} = HuongDanVienTourApi;
export const HuongDanVienRedeucer = HuongDanVienTourApi.reducer;
export default HuongDanVienTourApi;