import { createSlice, configureStore } from '@reduxjs/toolkit'

const ActiveCovSlice = createSlice({
    name: 'activeConv',
    initialState: {
        active: null,
    },
    reducers: {
        activeConversation: (state, action) => {
            state.active = action.payload
        },
    }
})

export const { activeConversation } = ActiveCovSlice.actions;
export default ActiveCovSlice.reducer;