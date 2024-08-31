/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import toast from 'react-hot-toast';

const onStart = (message?: string, onSuccess?: any) =>
  async function onQueryStarted(arg: any, { queryFulfilled, dispatch }: any) {
    document.getElementById('loader')?.classList.remove('opacity-0');
    try {
      await queryFulfilled;
      document.getElementById('loader')?.classList.add('opacity-0');
      if (onSuccess) onSuccess(dispatch, arg);
      if (message) toast.success(message);
    } catch (error: any) {
      console.log(error);
      document.getElementById('loader')?.classList.add('opacity-0');
    }
  };

export const apiSlice: any = createApi({
  reducerPath: 'api',
  tagTypes: ['strapi'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:1337/api/'
  }),
  endpoints: (builder) => ({
    getStudent: builder.query({
      query: (params: {collectionName:string, id: string; populateQuery?: string }) => ({
        url: `${params.collectionName}/${params.id}?${params.populateQuery}`,
        method: 'GET',
        credentials: 'include' as const
      }),
      onQueryStarted: onStart()
    }),
    deleteStudent: builder.mutation({
      query: (studentId) => ({
        url: `students/${studentId}`,
        method: 'DELETE',
        credentials: 'include' as const
      }),
      onQueryStarted: onStart('Deleted Successfuly', (dispatch: any) => {
        dispatch(
          apiSlice.endpoints.getCandidateList.initiate({
            page: 1,
            filterQuery: []
          })
        );
      })
    }),
    getCandidateList: builder.mutation({
      query: (params: { page: number; filterQuery: any[]; populateQuery: string }) => ({
        url: `students?${params.populateQuery}&pagination[page]=${
          params.page
        }&pagination[pageSize]=6${
          params.filterQuery.length > 0
            ? params.filterQuery.map(
                (q: any) =>
                  `&filters[${q.operatorFields}][${q.operator}]${q.text ? `=${q.text}` : ''} `
              )
            : ''
        }`,
        method: 'GET',
        credentials: 'include' as const
      }),
      onQueryStarted: onStart()
    }),
    getOptions: builder.query({
      query: (params: { searchValue: string; model: string }) => ({
        url: `${params.model}?_q=${params.searchValue}`,
        method: 'GET',
        credentials: 'include' as const
      }),
      onQueryStarted: onStart()
    }),
    createNewEntry: builder.mutation({
      query: (params: { data: any; model: string }) => ({
        url: `${params.model}`,
        method: 'POST',
        credentials: 'include' as const,
        body: {
          data: params.data
        }
      }),
      onQueryStarted: onStart()
    }),
    createNewStudent: builder.mutation({
      query: (params: { collectionName: string; id: string | undefined; data: any }) => ({
        url: params.id ? `${params.collectionName}/${params.id}` : params.collectionName,
        method: params.id ? 'PUT' : 'POST',
        credentials: 'include' as const,
        body: {
          data: params.data
        }
      }),
      onQueryStarted: onStart('Created New Document Successfully')
    })
  })
});

export const {
  useGetStudentQuery,
  useGetOptionsQuery,
  useCreateNewEntryMutation,
  useCreateNewStudentMutation,
  useGetCandidateListMutation,
  useDeleteStudentMutation
} = apiSlice;
