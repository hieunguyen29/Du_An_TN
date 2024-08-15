import { Ipostdm } from '../interface/postdm';
// import { pause } from '../';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const PostDmApi = createApi({
    reducerPath: 'postdm',
    tagTypes: ['postdm'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/admin",
        fetchFn: async (...args) => {

            return fetch(...args);
        }
    }),
    endpoints: (builder) =>
    // laytour
    ({
        getpostdm: builder.query<Ipostdm[], void>({
            query: () => `/postdm`,
            providesTags: ['postdm']
        }),
        addpostdm: builder.mutation<Ipostdm, Ipostdm>({
            query: (postdm) => ({
                url: '/postdm',
                method: "POST",
                body: postdm
            }),
            invalidatesTags: ['postdm']
        }),
        editpostdm: builder.mutation<Ipostdm, Ipostdm>({
            query: (postdm) => ({
                url: `/postdm/${postdm.id}`,
                method: "PUT",
                body: postdm
            }),
            invalidatesTags: ['postdm']
        }),
        removepostdm: builder.mutation<Ipostdm, Ipostdm>({
            query: (id) => ({
                url: `/postdm/${id}`,
                method: "DELETE",

            })

        }),
        getpostdmById: builder.query<Ipostdm, number>({
            query: (id) => `/postdm/${id}`,
            providesTags: ['postdm']
        }),

    })
});

export const {
    useGetpostdmQuery,
    useAddpostdmMutation,
    useEditpostdmMutation,
    useGetpostdmByIdQuery,
    useRemovepostdmMutation

} = PostDmApi;
export const postdmRedeucer = PostDmApi.reducer;
export default PostDmApi;