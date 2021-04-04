import { createSlice } from '@reduxjs/toolkit'
import sourceType from './sourceType';
import { selectedRanges} from './ChosenRangesSlice';

const sourceSlice = createSlice({
  name: 'source',
  initialState: "cases",
  reducers: {
    setSource(state, action) {
      return action.payload;
    }
  }
})

export const { setSource } = sourceSlice.actions;
export const getSource = state => state.source;

export const selectDataByAgeRange = ({source, deaths, cases}, range) => {
  const {covidData} = sourceType.deaths === source ? deaths : cases;

  const rates = covidData
    .map(dataByDate => ({
      date:dataByDate.date,
      rollingRate:dataByDate.covidNumbersByAge
        .filter(({age}) => age === range.ageRange)[0].rollingRate
    })
  );

  const max = rates.reduce((m, rate) => Math.max(m,rate.rollingRate), 0);

  return {
    ageRange:range.ageRange,
    colour:range.colour,
    rates,
    max
  }
}


export const selectDataByAgeRanges = (state, ranges) =>
  ranges.map(range => selectDataByAgeRange(state, range))

export const getSelectedData = state => {
  const ranges = selectedRanges(state);

  return selectDataByAgeRanges(state, ranges);
}



export const source = sourceSlice.reducer;
