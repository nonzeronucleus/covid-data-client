import { createSlice } from '@reduxjs/toolkit'
import { get } from 'lodash'
import { fetchDeathsByAgeRange } from './fetchDeathsByAgeRange';

const deathsSlice = createSlice({
  name: 'deaths',
  initialState: {loading: 'idle', covidData:[] },
  reducers: {
  },
  extraReducers: {
    [fetchDeathsByAgeRange.fulfilled]: (state, action) => {
      let {covidData} = get(action,'payload')

      return {...state, covidData};
    }
  }
})

export const selectDeathsByAge = state => get(state, "deaths.deathsByAge", {});

export const selectMaxByAge = state => get(state,"deaths.maxByAge", 0);

export const deaths = deathsSlice.reducer;
