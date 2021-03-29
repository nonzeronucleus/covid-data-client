import { createSlice, current } from '@reduxjs/toolkit'
import { fetchCasesByArea } from './fetchCasesByArea';
import { get } from 'lodash'

import allColours from './allColours'

const agesToFilterOut = ["unassigned", "60+", "00_59"]

const selectedRangesSlice = createSlice({
  name: 'chosenRanges',
  initialState: {selectedRanges:[], ranges:[], tranges:{}},
  reducers: {
    addRange(state, action) {
      const range = action.payload;
      const {ageRange} = range;

      state.selectedRanges.push(range)

      state.ranges[ageRange].isSelected = true;
    },
    removeRange(state, action) {
      const {ageRange} = action.payload;
      const selectedRanges = current(state.selectedRanges).filter(range => {
        return range !== action.payload
      })

      // let ranges = {} ;//{...state.ranges};

      state.selectedRanges = selectedRanges;

      state.ranges[ageRange].isSelected = false;
      // return {...state, selectedRanges, ranges};
    },
    toggleRange(state,action) {
      const ageRange = action.payload;

      console.log(ageRange)

      state.ranges[ageRange].isSelected = !state.ranges[ageRange].isSelected;
    }

  },
  extraReducers: {
    [fetchCasesByArea.fulfilled]: (state, action) => {
      const { casesByAge } = get(action, 'payload')

      const ageRanges = Object.keys(casesByAge).filter(a => !agesToFilterOut.includes(a));

      // const ranges = ageRanges.map((range, i) => {
      //   return { range, colour: allColours[i], selected: false }
      // })

      // console.log(ageRanges)

      const ranges = ageRanges.reduce((acc, range, i) => {
        return {...acc, [range]:{colour:allColours[i], isSelected: false}}
      },{})

      return { ...state, ranges };
      // return {...state};
    }
  }
})

export const { addRange, removeRange, toggleRange } = selectedRangesSlice.actions;

// export const selectedRanges = state => state.chosenRanges.selectedRanges;

export const selectedRanges = state => {
    const {ranges} = state.chosenRanges;

    return Object.keys(ranges).map(ageRange => {
      const {colour, isSelected} = ranges[ageRange];
      return {ageRange, colour, isSelected}
    }).filter(({isSelected}) => isSelected);
}

export const getRanges = state => state.chosenRanges.ranges;

export const chosenRanges = selectedRangesSlice.reducer;
