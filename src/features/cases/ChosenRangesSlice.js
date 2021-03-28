import { createSlice, current } from '@reduxjs/toolkit'

const selectedRangesSlice = createSlice({
  name: 'chosenRanges',
  initialState: [],
  reducers: {
      addRange(state, action) {
          state.push(action.payload)
      },
      removeRange (state, action) {
        const newState = current(state).filter(range => {
            return range !== action.payload
        })

        return newState;
      }
  }
})

export const selectedRanges = state => state.chosenRanges;

export const {addRange, removeRange} = selectedRangesSlice.actions;

export default selectedRangesSlice.reducer;
