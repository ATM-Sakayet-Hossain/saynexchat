import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./lib/api";
import ActiveCovSlice from "./slices/ActiveConvSlice";
import MessagesSlice from "./slices/messagesSlice";
export const store = configureStore({
  reducer: {
    activeConv: ActiveCovSlice,
    messages: MessagesSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
