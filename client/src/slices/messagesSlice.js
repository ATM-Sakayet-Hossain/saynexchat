import { createSlice, configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '../lib/api';

const MessagesSlice = createSlice({
    name: 'messSlice',
    initialState: {
        messagesList: [],
        loading: true
    },
    reducers: {
        addMessage: (state, action) => {
            state.messagesList.push(action.payload)
        },
    },
    extraReducers: (builder) => {
        // Intercept the fulfilled action of the getUsers endpoint
        builder.addMatcher(
            apiSlice.endpoints.getMessages.matchFulfilled,
            (state, action) => {                
                // action.payload contains the data returned from your API
                state.messagesList = action.payload;
                state.loading = false
            }
        );
    },
})

export const { addMessage } = MessagesSlice.actions;
export default MessagesSlice.reducer;