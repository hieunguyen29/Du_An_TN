import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IDangNhap } from '../interface/dangnhap';

const DangNhapApi = createApi({
  reducerPath: 'DangNhap',
  tagTypes: ['DangNhap'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api',
    fetchFn: async (...args) => {
      const response = await fetch(...args);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  }),
  endpoints: (builder) => ({
    getDangNhap: builder.query<IDangNhap[], void>({
      query: () => `/DangNhap`,
      providesTags: ['DangNhap'],
    }),
  }),
});

export const { useGetDangNhapQuery } = DangNhapApi;
export const DangNhapReducer = DangNhapApi.reducer;
export default DangNhapApi;