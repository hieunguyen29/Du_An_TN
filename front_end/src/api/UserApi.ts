import { IUser } from "../interface/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const UserApi = createApi({
  reducerPath: "user",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/admin",
    fetchFn: async (...args) => {

        return fetch(...args);
    }
}),
  endpoints: (builder) => ({
    getUser: builder.query<IUser[], void>({
      query: () => `/user`,
      providesTags: ["User"],
    }),
    getRoles: builder.query<IUser[], number>({
      query: (id) => `/user/phanvaitro/${id}`,
      providesTags: ["User"],
    }),
    getPermissions: builder.query<IUser[], number>({
      query: (id) => `/user/phanquyen/${id}`,
      providesTags: ["User"],
    }),
    addRoles: builder.mutation<IUser, IUser>({
      query: (User) => ({
        url: "/user/add_role",
        method: "POST",
        body: User,
      }),
    }),
    addPermissions: builder.mutation<IUser, IUser>({
      query: (User) => ({
        url: "/user/add_permission",
        method: "POST",
        body: User,
      }),
    }),
    editRoles: builder.mutation<IUser, IUser>({
      query: (User) => ({
        url: `/user/insert_roles/${User.id}`,
        method: "POST",
        body: User,
      }),
    }),
    editPermissions: builder.mutation<IUser, IUser>({
      query: (User) => ({
        url: `/user/insert_permission/${User.id}`,
        method: "POST",
        body: User,
      }),
    }),
    addUser: builder.mutation<IUser, IUser>({
      query: (User) => ({
        url: "/user",
        method: "POST",
        body: User,
      }),
    }),
    editUser: builder.mutation<IUser, IUser>({
      query: (user) => ({
        url: `/user/${user.id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    removeUser: builder.mutation<IUser, IUser>({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
    }),
    getUserById: builder.query<IUser, number>({
      query: (id) => `/user/${id}`,
      providesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useRemoveUserMutation,
  useEditUserMutation,
  useAddUserMutation,
  useGetUserQuery,
  useGetRolesQuery,
  useGetPermissionsQuery,
  useAddRolesMutation,
  useAddPermissionsMutation,
  useEditRolesMutation,
  useEditPermissionsMutation,
} = UserApi;

export const UserReducer = UserApi.reducer;
export default UserApi;
