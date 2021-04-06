import { createSlice } from '@reduxjs/toolkit'
import { fetchCasesByAgeRange } from './fetchCasesByAgeRange';

import allColours from './allColours'

const agesToFilterOut = ["unassigned", "60+", "00-59"]

const selectedRangesSlice = createSlice({
  name: 'chosenRanges',
  initialState: {ranges:[]},
  reducers: {
    addRange(state, action) {
      const range = action.payload;
      const {ageRange} = range;

      state.ranges[ageRange].isSelected = true;
    },
    removeRange(state, action) {
      const {ageRange} = action.payload;

      state.ranges[ageRange].isSelected = false;
    },
    toggleRange(state,action) {
      const ageRange = action.payload;

      state.ranges[ageRange].isSelected = !state.ranges[ageRange].isSelected;
    },
    changeColour(state, action) {
      const {ageRange, colour} = action.payload;

      state.ranges[ageRange].colour = colour;

    }

  },
  extraReducers: {
    [fetchCasesByAgeRange.fulfilled]: (state, action) => {
      const {cases} = action.payload;

      const ranges = cases[0].covidNumbersByAge
        .filter(({age}) => !agesToFilterOut.includes(age))
        .reduce((acc, {age}, i) => (
          {...acc, [age]:{colour:allColours[i], isSelected: false}}
        ), {})

      return { ...state, ranges };
    }
  }
})

export const { addRange, removeRange, toggleRange, changeColour } = selectedRangesSlice.actions;

export const selectedRanges = state => getRanges(state).filter(({isSelected}) => isSelected);

export const getRanges = state => {
  const {ranges} = state.chosenRanges;

  return Object.keys(ranges).map(ageRange => {
    const {colour, isSelected} = ranges[ageRange];
    return {ageRange, colour, isSelected}
  });
}

export const chosenRanges = selectedRangesSlice.reducer;
