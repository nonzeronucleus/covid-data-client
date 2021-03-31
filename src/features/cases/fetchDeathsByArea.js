import { createAsyncThunk } from '@reduxjs/toolkit';
import { getByArea } from './deathsAPI';
import { get } from 'lodash'
const deathsText = 'newDeaths28DaysByDeathDateAgeDemographics';

export const fetchDeathsByArea = createAsyncThunk(
  'users/fetchDeathsByArea',
  async (userId, thunkAPI) => {
    const response = await getByArea(userId);

    const records = response.data;
    let deathsByAge = {};

    records.forEach(record => {
      const deaths = get(record, deathsText)
      deaths.forEach(deathData => {
        const {age, rollingRate} = deathData;
        if(deathsByAge[age]==null) {
          deathsByAge[age]=[];
        }
        deathsByAge[age].push({date:record.date,rollingRate});
      })
    })

    return {deathsByAge};
  }
);
