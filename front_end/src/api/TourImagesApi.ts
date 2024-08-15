import { ITourImages } from '../interface/tourimages';
// import { pause } from '../';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const TourImagesApi = createApi({
    reducerPath: 'tourimages',
    tagTypes: ['TourImages'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/admin",
        fetchFn: async (...args) => {
           
            return fetch(...args);
        }
    }),
    endpoints: (builder) => ({
        getTourImages: builder.query<ITourImages[], void>({
            query: () => `/tour-images`,
            providesTags: ['TourImages']
        }),
       
        addTourImages:builder.mutation<ITourImages,ITourImages>({
            query:(tourimages)=>({
                url:'/tour-images',
                method: "POST",
                body:tourimages
        }),
        invalidatesTags: ['TourImages']
        }),
        editTourImages:builder.mutation<ITourImages,ITourImages>({
            query:(tourimages)=>({
                url:`tour-images/${tourimages.id}`,
                method: "PUT",
                body:tourimages
        }),
        invalidatesTags: ['TourImages']
        }),
        removeTourImages:builder.mutation<ITourImages,ITourImages>({
            query:(id)=>({
                url:`/tour-images/${id}`,
                method: "DELETE",
              
            })
            
        }),
        getTourImagesById: builder.query<ITourImages, number >({
            query: (id) => `/tour-images/${id}` ,
            providesTags: ['TourImages']
        }),
       

    })
});

export const {
    useGetTourImagesQuery,
   useAddTourImagesMutation,
   useEditTourImagesMutation,
   useGetTourImagesByIdQuery,
   useRemoveTourImagesMutation,

} = TourImagesApi;
export const TourImagesRedeucer = TourImagesApi.reducer;
export default TourImagesApi;