import { createSlice } from '@reduxjs/toolkit'
import { get } from 'lodash'
import { fetchCasesByArea } from './fetchCasesByArea';

// const casesText = 'newCasesBySpecimenDateAgeDemographics';
// const casesText = 'newDeaths28DaysByDeathDateAgeDemographics';

const agesToFilterOut = ["unassigned", "60+", "00_59"]

const casesSlice = createSlice({
  name: 'cases',
  initialState: {loading: 'idle' },
  reducers: {
  },
  extraReducers: {
    [fetchCasesByArea.fulfilled]: (state, action) => {
      let {casesByAge} = get(action,'payload')

      const ageRanges=Object.keys(casesByAge).filter(a => !agesToFilterOut.includes(a));

      return {...state, casesByAge, ageRanges};
    }
  }
})

export const selectCasesByAge = state => get(state, "cases.casesByAge", {});
export const selectAgeRanges = state => get(state, "cases.ageRanges", []);

export default casesSlice.reducer;
