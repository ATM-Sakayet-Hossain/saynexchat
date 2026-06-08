import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://chatapp-node2501.onrender.com",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginData) => ({
        url: "/auth/signin",
        method: "POST",
        body: loginData,
      }),
    }),
    getProfile: builder.query({
      query: () => "/auth/profile",
    }),
    getConversations: builder.query({
      query: () => "/conv/list",
    }),
    getMessages: builder.query({
      query: (convId) => `/conv/getmessages/${convId}`,
    }),
    sendMessage: builder.mutation({
      query: (messageData) => ({
        url: "/conv/sendmessage",
        method: "POST",
        body: messageData,
      }),
    }),
  }),
});

export const { useGetConversationsQuery, useLoginMutation, useGetProfileQuery, useLazyGetMessagesQuery, useSendMessageMutation } = apiSlice;
