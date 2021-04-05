import { createSlice } from '@reduxjs/toolkit'
import { get } from 'lodash'
import { fetchCasesByAgeRange } from './fetchCasesByAgeRange';

const casesSlice = createSlice({
  name: 'cases',
  initialState: {loading: 'idle', covidData:[]  },
  reducers: {
  },
  extraReducers: {
    [fetchCasesByAgeRange.fulfilled]: (state, action) => {
      let {covidData} = get(action,'payload')

      return {...state, covidData};
    }
  }
})

export default casesSlice.reducer;
