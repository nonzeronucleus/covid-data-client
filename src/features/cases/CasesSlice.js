import { createSlice } from '@reduxjs/toolkit'
import { get } from 'lodash'
import { fetchCasesByArea } from './fetchCasesByArea';

const casesSlice = createSlice({
  name: 'cases',
  initialState: {loading: 'idle', covidData:[]  },
  reducers: {
  },
  extraReducers: {
    [fetchCasesByArea.fulfilled]: (state, action) => {
      let {covidData} = get(action,'payload')

      return {...state, covidData};
    }
  }
})

export default casesSlice.reducer;
