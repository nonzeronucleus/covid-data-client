import { createSlice } from '@reduxjs/toolkit'
import { get } from 'lodash'
import { fetchDeathsByArea } from './fetchDeathsByArea';

const deathsSlice = createSlice({
  name: 'deaths',
  initialState: {loading: 'idle', covidData:[] },
  reducers: {
  },
  extraReducers: {
    [fetchDeathsByArea.fulfilled]: (state, action) => {
      let {covidData} = get(action,'payload')

      return {...state, covidData};
    }
  }
})

export const selectDeathsByAge = state => get(state, "deaths.deathsByAge", {});

export const selectMaxByAge = state => get(state,"deaths.maxByAge", 0);

export const deaths = deathsSlice.reducer;
