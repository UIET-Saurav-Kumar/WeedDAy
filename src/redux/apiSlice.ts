'use client'
import { createApi ,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath : "api",
    baseQuery : fetchBaseQuery({
        baseUrl : "https://api.weekday.technology/adhoc/",
    }),
    endpoints : (builder) => ({
        jobdata : builder.query({
            query : (data) => ({
                url : 'getSampleJdJSON',
                method : "POST",
                body : data
            }),
        })

    })
});

export const {useJobdataQuery} = apiSlice; 