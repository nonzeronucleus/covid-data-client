import { createAsyncThunk } from '@reduxjs/toolkit';
import { getByArea } from './deathsAPI';

export const fetchDeathsByArea = createAsyncThunk(
  'users/fetchDeathsByArea',
  async (userId, thunkAPI) => {
    const response = await getByArea(userId);

    const records = response.data;

    const covidData = records
      .map(({date,newDeaths28DaysByDeathDateAgeDemographics }) =>
      ({date, covidNumbersByAge:newDeaths28DaysByDeathDateAgeDemographics}))

    return {covidData};
  }
);
