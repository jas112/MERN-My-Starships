import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import starshipService from './starshipService'

const initialState = {
    starships: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// collect starship
export const setStarship = createAsyncThunk('starships/add', async (starshipData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await starshipService.setStarship(starshipData, token)
    } catch (error) {
        const message = 
        (error.response && 
            error.response.data && 
            error.response.data.message) || 
            error.message || 
            error.message.toString()
        return thunkAPI.rejectWithValue(message)
    }

})

// get user starships
export const getStarships = createAsyncThunk('starships/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await starshipService.getStarships(token)
    } catch (error) {
        const message = 
        (error.response && 
            error.response.data && 
            error.response.data.message) || 
            error.message || 
            error.message.toString()
        return thunkAPI.rejectWithValue(message)
    }

})

// remove starship
export const removeStarship = createAsyncThunk('starships/delete', async (starshipId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await starshipService.removeStarship(starshipId, token)
    } catch (error) {
        const message = 
        (error.response && 
            error.response.data && 
            error.response.data.message) || 
            error.message ||
            error.message.toString()
        return thunkAPI.rejectWithValue(message)
    }

})

export const starshipSlice = createSlice({
    name: 'starship',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(setStarship.pending, (state) => {
                state.isLoading = true
            })
            .addCase(setStarship.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.starships.push(action.payload)
            })
            .addCase(setStarship.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

        builder
            .addCase(getStarships.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getStarships.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.starships = action.payload
            })
            .addCase(getStarships.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

        builder
            .addCase(removeStarship.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeStarship.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.starships = state.starships.filter((starship) => starship._id !== action.payload.id)
            })
            .addCase(removeStarship.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = starshipSlice.actions
export default starshipSlice.reducer