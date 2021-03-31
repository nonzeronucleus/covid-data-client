import { createSlice } from '@reduxjs/toolkit'
import { get } from 'lodash'
import { fetchDeathsByArea } from './fetchDeathsByArea';

// const casesText = 'newCasesBySpecimenDateAgeDemographics';
// const casesText = 'newDeaths28DaysByDeathDateAgeDemographics';

const deathsSlice = createSlice({
  name: 'deaths',
  initialState: {loading: 'idle' },
  reducers: {
  },
  extraReducers: {
    [fetchDeathsByArea.fulfilled]: (state, action) => {
      let {deathsByAge} = get(action,'payload')

      return {...state, deathsByAge};
    }
  }
})

export const selectDeathsByAge = state => get(state, "deaths.deathsByAge", {});

// export default deathsSlice.reducer;
export const deaths = deathsSlice.reducer;
