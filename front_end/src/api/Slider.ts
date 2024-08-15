import { Ibannerlogo } from '../interface/Banner_logo';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BannerApi = createApi({
    reducerPath: 'Images',
    tagTypes: ['Images'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/admin/",
        fetchFn: async (...args) => {
            const response = await fetch(...args);
            return response.json();
        }
    }),
    endpoints: (builder) => ({
        getSliders: builder.query<Ibannerlogo[], void>({
            query: () => '/bannerlogo',
            providesTags: ['Images'],
        }),
        addSliders: builder.mutation<Ibannerlogo, Ibannerlogo>({
            query: (images) => ({
                url: '/bannerlogo',
                method: 'POST',
                body: images,
            }),
            invalidatesTags: ['Images'],
        }),
        editSliders: builder.mutation<Ibannerlogo, Ibannerlogo>({
            query: (images) => ({
                url: `bannerlogo/${images.id}`,
                method: 'PUT',
                body: images,
            }),
            invalidatesTags: ['Images'],
        }),
        removeSliders: builder.mutation<Ibannerlogo, number>({
            query: (id) => ({
                url: `/bannerlogo/${id}`,
                method: 'DELETE',
            }),
        }),
        getSlidersById: builder.query<Ibannerlogo, number>({
            query: (id) => `/bannerlogo/${id}`,
            providesTags: ['Images'],
        }),
    }),
});

export const {
    useGetSlidersQuery,
    useAddSlidersMutation,
    useEditSlidersMutation,
    useGetSlidersByIdQuery,
    useRemoveSlidersMutation,
} = BannerApi;

export const BannerReducer = BannerApi.reducer;
export default BannerApi;
