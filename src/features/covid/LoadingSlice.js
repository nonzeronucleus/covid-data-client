import { createSlice } from '@reduxjs/toolkit'
import { fetchDeathsByAgeRange } from './fetchDeathsByAgeRange';
import { fetchCasesByAgeRange } from './fetchCasesByAgeRange';

const status = {
    NOT_LOADED:"not loaded",
    LOADING:"loading",
    LOADED:"loaded"
}

const loadingSlice = createSlice({
  name: 'loadingStatus',
  initialState: {cases:status.NOT_LOADED, deaths:status.NOT_LOADED},
  reducers: {
  },
  extraReducers: {
    [fetchCasesByAgeRange.pending]: (state) => {
        return {...state, cases:status.LOADING}
    },
    [fetchCasesByAgeRange.fulfilled]: (state) => {
        return {...state, cases:status.LOADED}
    },
    [fetchDeathsByAgeRange.pending]: (state) => {
        return {...state, deaths:status.LOADING}
    },
    [fetchDeathsByAgeRange.fulfilled]: (state) => {
        return {...state, deaths:status.LOADED}
    }
  }
})

// export const getCases = state => get(state, "covidData.cases", []);
// export const getDeaths = state => get(state, "covidData.deaths", []);

export const isAllLoaded = ({loadingStatus}) => loadingStatus.cases === status.LOADED && loadingStatus.deaths === status.LOADED;

export const loadingStatus = loadingSlice.reducer;
