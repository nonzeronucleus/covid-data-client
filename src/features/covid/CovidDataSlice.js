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
      let {cases} = get(action,'payload')

      return {...state, cases};
    },
    [fetchDeathsByAgeRange.fulfilled]: (state, action) => {
      let {deaths} = get(action,'payload')

      return {...state, deaths};
    }
  }
})

export const getCases = state => get(state, "covidData.cases", []);
export const getDeaths = state => get(state, "covidData.deaths", []);

export const getNumDaysForCases = state => state.covidData.cases.length;
export const getNumDaysForDeaths = state => state.covidData.deaths.length;

export const covidData = covidDataSlice.reducer;
