

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


interface Notification {
    id: number;
    name_user: string;
    body: string;
    ngay_gio: string;
    loai_thong_bao: string;
    status: number;
    id_tour: number;
    user_id: number | null;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    tours: {
      id: number;
      ten_tour: string;
      image_path: string;
      diem_di: string;
      diem_den: string;
      lich_khoi_hanh: string;
      ngay_ket_thuc: string;
      diem_khoi_hanh: string;
      gia_nguoilon: number;
      gia_treem: number;
      mo_ta: string;
      soluong: number;
      trang_thai: number;
      ma_loai_tour: number;
      created_at: string | null;
      updated_at: string;
      deleted_at: string | null;
    };
  }
  
  interface NotificationResponse {
    notification: Notification[];
    count: number;
  }
  

const NotificationApi = createApi({
    reducerPath: 'notification',
    tagTypes: ['notification'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/admin",
        fetchFn: async (...args) => {
           
            return fetch(...args);
        }
    }),
    endpoints: (builder) => ({

        getnotification: builder.query<NotificationResponse[], void >({
            query: () => `/notification/` ,
            providesTags: ['notification']
        }),
    

    })
});
export const {
useGetnotificationQuery

} = NotificationApi;
export const NotificationReducer = NotificationApi.reducer;
export default NotificationApi;