import { IDiaDiem } from '../interface/diadiem';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const DiaDiemApi = createApi({
    reducerPath: 'diadiem',
    tagTypes: ['DiaDiem'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/admin",
        fetchFn: async (...args) => {
           
            return fetch(...args);
        }
    }),
    endpoints: (builder) => ({
        getDiaDiem: builder.query<IDiaDiem[], void>({
            query: () => `/diadiem`,
            providesTags: ['DiaDiem']
        }),
        addDiaDiem:builder.mutation<IDiaDiem,IDiaDiem>({
            query:(DiaDiem)=>({
                url:'/diadiem',
                method: "POST",
                body:DiaDiem
        }),
        invalidatesTags: ['DiaDiem']
        }),
        editDiaDiem:builder.mutation<IDiaDiem,IDiaDiem>({
            query:(DiaDiem)=>({
                url:`/diadiem/${DiaDiem.id}`,
                method: "PUT",
                body:DiaDiem
        }),
        invalidatesTags: ['DiaDiem']
        }),
         removeDiaDiem:builder.mutation<IDiaDiem,IDiaDiem>({
             query:(id)=>({
                 url:`/diadiem/${id}`,
                method: "DELETE",
           
            })
            
        }),
        getDiaDiemById: builder.query<IDiaDiem, number >({
            query: (id) => `/diadiem/${id}` ,
            providesTags: ['DiaDiem']
        }),
       

    })
});
export const {
    useGetDiaDiemQuery,
    useAddDiaDiemMutation,
    useEditDiaDiemMutation,
    useGetDiaDiemByIdQuery,
    useRemoveDiaDiemMutation,

} = DiaDiemApi;
export const DiaDiemRedeucer = DiaDiemApi.reducer;
export default DiaDiemApi;