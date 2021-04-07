import { createSlice } from '@reduxjs/toolkit'

import { fetchCasesByAgeRange } from '../covid/fetchCasesByAgeRange';
import { fetchDeathsByAgeRange } from '../covid/fetchDeathsByAgeRange';
import { setSource } from '../Sources/SourceSlice';
import sourceTypes from '../Sources/sourceType';

const selectedDateRangesSlice = createSlice({
    name: 'chosenDateRanges',
    initialState: { start: 0, end: 0, numDaysWithCases: 0, numDaysWithDeaths: 0 },
    reducers: {
        setDateRange(state, action) {
            return { ...state, start: action.payload.start, end: action.payload.end }
        }
    },
    extraReducers: {
        [fetchCasesByAgeRange.fulfilled]: (state, action) => {
            const { cases } = action.payload;

            return { ...state, end: cases.length, numDaysWithCases: cases.length-1 };
        },
        [fetchDeathsByAgeRange.fulfilled]: (state, action) => {
            const { deaths } = action.payload;

            return { ...state, numDaysWithDeaths: deaths.length-1 };
        },
        [setSource]: (state, action) => {
            const maxDays = action.payload === sourceTypes.cases ? state.numDaysWithCases : state.numDaysWithDeaths;
            return {
                ...state,
                end: Math.min(state.end, maxDays)
            }

        }
    }
})

export const { setDateRange } = selectedDateRangesSlice.actions;
export const getDateRange = ({chosenDateRanges:{start, end}}) => ({start, end})

// export const selectedAgeRanges = state => getAgeRanges(state).filter(({isSelected}) => isSelected);

// export const getAgeRanges = state => {
//   const {ageRanges} = state.chosenAgeRanges;

//   return Object.keys(ageRanges).map(ageRange => {
//     const {colour, isSelected} = ageRanges[ageRange];
//     return {ageRange, colour, isSelected}
//   });
// }

export const chosenDateRanges = selectedDateRangesSlice.reducer;
