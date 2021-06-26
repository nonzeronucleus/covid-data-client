import { createSlice } from '@reduxjs/toolkit'
import { fetchCasesByAgeRange } from '../covid/fetchCasesByAgeRange';
import allColours from '../covid/allColours'
import { pickBy} from 'lodash';
import filterAgeRanges from './filterAgeRanges';
// const agesToFilterOut = ["unassigned", "60+", "00-59"]

const ageRangesSlice = createSlice({
  name: 'ageRanges',
  initialState: {},
  reducers: {
    toggleAgeRange(state,action) {
      const ageRange = action.payload;

      state[ageRange].isSelected = !state[ageRange].isSelected;
    },
    changeColour(state, action) {
      const {ageRange, colour} = action.payload;

      state[ageRange].colour = colour;
    }
  },
  extraReducers: {
    [fetchCasesByAgeRange.fulfilled]: (state, action) => {
      const {cases} = action.payload;

      const ageRanges = filterAgeRanges(cases[0].covidNumbersByAge)
        // .filter(({age}) => !agesToFilterOut.includes(age))
        .reduce((acc, {age}, i) => (
          {...acc, [age]:{colour:allColours[i], isSelected: true}}
        ), {})

      return ageRanges;
    }
  }
})

export const { toggleAgeRange, changeColour } = ageRangesSlice.actions;

export const getAgeRanges = state => {
  const {ageRanges} = state;

  return Object.keys(ageRanges).map(ageRange => {
    const {colour, isSelected} = ageRanges[ageRange];
    return {ageRange, colour, isSelected}
  });
}

export const getSelectedAgeRanges = ({ageRanges}) => {
  return pickBy(ageRanges, (value) => {
    return value.isSelected
  });
}

export const ageRanges = ageRangesSlice.reducer;
