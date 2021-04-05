import { createSlice } from '@reduxjs/toolkit'
import { get } from 'lodash'
import { fetchDeathsByAgeRange } from './fetchDeathsByAgeRange';
import { fetchCasesByAgeRange } from './fetchCasesByAgeRange';

const covidDataSlice = createSlice({
  name: 'covidData',
  initialState: {cases:[], deaths:[] },
  reducers: {
  },
  extraReducers: {
    [fetchCasesByAgeRange.fulfilled]: (state, action) => {
      let {covidData} = get(action,'payload')

      return {...state, cases:covidData};
    },
    [fetchDeathsByAgeRange.fulfilled]: (state, action) => {
      let {covidData} = get(action,'payload')

      return {...state, deaths:covidData};
    }
  }
})

// export const selectDeathsByAge = state => get(state, "deaths.deathsByAge", {});

// export const selectMaxByAge = state => get(state,"deaths.maxByAge", 0);

export const covidData = covidDataSlice.reducer;
