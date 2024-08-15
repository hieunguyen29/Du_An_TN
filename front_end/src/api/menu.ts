

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export interface LoaiTour {
    id: number;
    ten_loai_tour: string;
  }
  
  export interface MenuPhanCapItem {
    loaiTour: LoaiTour;
    diemDens: string[];
  }

const MenuApi = createApi({
    reducerPath: 'menu-phan-cap',
    tagTypes: ['menu-phan-cap'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api",
        fetchFn: async (...args) => {
           
            return fetch(...args);
        }
    }),
    endpoints: (builder) => ({

        getMenu: builder.query<MenuPhanCapItem[], void >({
            query: () => `/menu-phan-cap/` ,
            providesTags: ['menu-phan-cap']
        }),
    

    })
});
export const {
useGetMenuQuery

} = MenuApi;
export const MenuReducer = MenuApi.reducer;
export default MenuApi;