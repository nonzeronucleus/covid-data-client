import { createSlice } from '@reduxjs/toolkit'
import { fetchCasesByAgeRange } from './fetchCasesByAgeRange';

import allColours from './allColours'

const agesToFilterOut = ["unassigned", "60+", "00-59"]

const selectedRangesSlice = createSlice({
  name: 'chosenRanges',
  initialState: {ageRanges:[]},
  reducers: {
    toggleAgeRange(state,action) {
      const ageRange = action.payload;

      state.ageRanges[ageRange].isSelected = !state.ageRanges[ageRange].isSelected;
    },
    changeColour(state, action) {
      const {ageRange, colour} = action.payload;

      state.ageRanges[ageRange].colour = colour;
    }

  },
  extraReducers: {
    [fetchCasesByAgeRange.fulfilled]: (state, action) => {
      const {cases} = action.payload;

      const ageRanges = cases[0].covidNumbersByAge
        .filter(({age}) => !agesToFilterOut.includes(age))
        .reduce((acc, {age}, i) => (
          {...acc, [age]:{colour:allColours[i], isSelected: false}}
        ), {})

      return { ...state, ageRanges };
    }
  }
})

export const { toggleAgeRange, changeColour } = selectedRangesSlice.actions;

export const selectedAgeRanges = state => getAgeRanges(state).filter(({isSelected}) => isSelected);

export const getAgeRanges = state => {
  const {ageRanges} = state.chosenRanges;

  return Object.keys(ageRanges).map(ageRange => {
    const {colour, isSelected} = ageRanges[ageRange];
    return {ageRange, colour, isSelected}
  });
}

export const chosenRanges = selectedRangesSlice.reducer;
