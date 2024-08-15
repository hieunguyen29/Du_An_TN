import { Ipost } from '../interface/post';
// import { pause } from '../';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const PostApi = createApi({
    reducerPath: 'post',
    tagTypes: ['post'],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api/admin",
        fetchFn: async (...args) => {

            return fetch(...args);
        }
    }),
    endpoints: (builder) =>
    // laytour
    ({
        getpost: builder.query<Ipost[], void>({
            query: () => `/post`,
            providesTags: ['post']
        }),
        addpost: builder.mutation<Ipost, Ipost>({
            query: (postdm) => ({
                url: '/post',
                method: "POST",
                body: postdm
            }),
            invalidatesTags: ['post']
        }),
        editpost: builder.mutation<Ipost, Ipost>({
            query: (postdm) => ({
                url: `/post/${postdm.id}`,
                method: "PUT",
                body: postdm
            }),
            invalidatesTags: ['post']
        }),
        removepost: builder.mutation<Ipost, Ipost>({
            query: (id) => ({
                url: `/post/${id}`,
                method: "DELETE",

            })

        }),
        getpostById: builder.query<Ipost, number>({
            query: (id) => `/post/${id}`,
            providesTags: ['post']
        }),

    })
});

export const {
    useGetpostQuery,
    useAddpostMutation,
    useEditpostMutation,
    useGetpostByIdQuery,
    useRemovepostMutation

} = PostApi;
export const postRedeucer = PostApi.reducer;
export default PostApi;