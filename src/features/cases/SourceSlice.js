import { createSlice } from '@reduxjs/toolkit'
import { selectCasesByAge } from './CasesSlice';
import { selectDeathsByAge } from './DeathsSlice';

const sourceSlice = createSlice({
  name: 'source',
  initialState: "cases",
  reducers: {
    setSource(state, action) {
      return action.payload;
    }
  }
})

export const { setSource } = sourceSlice.actions;
export const getSource = state => state.source;

export const selectByAge = state => state.source === "deaths" ? selectDeathsByAge(state) : selectCasesByAge(state);


// export const selectedRanges = state => getRanges(state).filter(({isSelected}) => isSelected);


export const source = sourceSlice.reducer;
