

    import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
    import { TourDiemDen } from '../interface/diademinfo';

    const Tourdiadiem = createApi({
        reducerPath: 'getToursByDestination',
        tagTypes: ['getToursByDestination'],
        baseQuery: fetchBaseQuery({
            baseUrl: "http://localhost:8000/api",
            fetchFn: async (...args) => {
            
                return fetch(...args);
            }
        }),
        endpoints: (builder) => ({

            getTourDiadiem: builder.query<TourDiemDen, number >({
                query: (destination) => `getToursByDestination?diem_den=${destination}`,
                providesTags: ['getToursByDestination']
            }),
        

        })
    });
    export const {
        useGetTourDiadiemQuery

    } = Tourdiadiem;
    export const TourDiadiemReducer = Tourdiadiem.reducer;
    export default Tourdiadiem;