import { Iimages } from '../interface/images';
// import { pause } from '../';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const ImagesApi = createApi({
    reducerPath: 'images',
    tagTypes: ['Images'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/admin",
        fetchFn: async (...args) => {
           
            return fetch(...args);
        }
    }),
    endpoints: (builder) => ({
        getImages: builder.query<Iimages[], void>({
            query: () => `/images/images`,
            providesTags: ['Images']
        }),
        addImages:builder.mutation<Iimages,Iimages>({
            query:(images)=>({
                url:'/images',
                method: "POST",
                body:images
        }),
        invalidatesTags: ['Images']
        }),
        editImages:builder.mutation<Iimages,Iimages>({
            query:(images)=>({
                url:`images/edit/${images.id}`,
                method: "POST",
                body:images
        }),
        invalidatesTags: ['Images']
        }),
        removeImages:builder.mutation<Iimages,Iimages>({
            query:(id)=>({
                url:`/images/${id}`,
                method: "DELETE",
              
            })
            
        }),
        getImagesById: builder.query<Iimages, number >({
            query: (id) => `/images/${id}` ,
            providesTags: ['Images']
        }),
       

    })
});

export const {
    useGetImagesQuery,
    useAddImagesMutation,
    useEditImagesMutation,
    useGetImagesByIdQuery,
    useRemoveImagesMutation,

} = ImagesApi;
export const imagesRedeucer = ImagesApi.reducer;
export default ImagesApi;