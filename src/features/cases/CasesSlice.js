import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getByArea } from './casesAPI'


// const

// First, create the thunk
export const fetchCasesByArea = createAsyncThunk(
  'users/fetchCasesByArea',
  async (userId, thunkAPI) => {
    const response = await getByArea(userId)
    return response.data
  }
)

// Then, handle actions in your reducers:
const casesSlice = createSlice({
  name: 'cases',
  initialState: { entities: [], loading: 'idle' },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [fetchCasesByArea.fulfilled]: (state, action) => {
      // Add user to the state array
      state.entities.push(action.payload)
    }
  }
})

export const selectCases = state => state.cases;

export default casesSlice.reducer;

// Later, dispatch the thunk as needed in the app
// dispatch(fetchUserById(123))