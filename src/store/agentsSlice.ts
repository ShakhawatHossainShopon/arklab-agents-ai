import { getAgents } from "@/services/agents";
import { createSlice } from "@reduxjs/toolkit";
type IAgents = {
    data: any;
    loading: boolean;
    error: string | null;
};

const initialState: IAgents = {
    data: null,
    loading: false,
    error: null,
};
const agentSlice = createSlice({
    name: "agents",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAgents.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(getAgents.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getAgents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch agents";
            });
    }
})

export default agentSlice.reducer;