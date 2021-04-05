import { createSlice } from '@reduxjs/toolkit'
import { getCases, getDeaths } from './CovidDataSlice';
import sourceType from './sourceType';

const sourceSlice = createSlice({
  name: 'source',
  initialState: sourceType.cases,
  reducers: {
    setSource(state, action) {
      return action.payload;
    }
  }
})

export const { setSource } = sourceSlice.actions;
export const getSource = state => state.source;

export const getAllCovidData = (state) => sourceType.cases === state.source ? getCases(state) : getDeaths(state);

export const source = sourceSlice.reducer;
