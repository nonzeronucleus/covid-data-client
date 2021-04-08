import { createSlice } from '@reduxjs/toolkit'
import dataType from './dataTypes';


const dataToDisplaySlice = createSlice({
  name: 'dataToDisplay',
  initialState: dataType.rate,
  reducers: {
    setDataToDisplay(state, action) {
      return action.payload;
    }
  }
})

export const { setDataToDisplay } = dataToDisplaySlice.actions;
export const getDataToDisplay = state => state.dataToDisplay;

// export const getAllCovidData = (state) => sourceType.cases === state.source ? getCases(state) : getDeaths(state);

// export const getNumDays = state => sourceType.cases === state.source ? getNumDaysForCases(state) : getNumDaysForDeaths(state);

export const dataToDisplay = dataToDisplaySlice.reducer;
