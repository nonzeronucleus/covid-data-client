import { createSlice } from '@reduxjs/toolkit'
import { get } from 'lodash'
import { fetchCasesByArea } from './fetchCasesByArea';

// const casesText = 'newCasesBySpecimenDateAgeDemographics';
// const casesText = 'newDeaths28DaysByDeathDateAgeDemographics';

const casesSlice = createSlice({
  name: 'cases',
  initialState: {loading: 'idle' },
  reducers: {
  },
  extraReducers: {
    [fetchCasesByArea.fulfilled]: (state, action) => {
      let {casesByAge} = get(action,'payload')

      return {...state, casesByAge};
    }
  }
})

export const selectCasesByAge = state => get(state, "cases.casesByAge", {});

export default casesSlice.reducer;
