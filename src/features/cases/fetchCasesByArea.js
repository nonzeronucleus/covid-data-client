import { createAsyncThunk } from '@reduxjs/toolkit';
import { getByArea } from './casesAPI';

export const fetchCasesByArea = createAsyncThunk(
  'users/fetchCasesByArea',
  async (userId, thunkAPI) => {
    const response = await getByArea(userId);

    const records = response.data;

    const covidData = records
      .map(({date,newCasesBySpecimenDateAgeDemographics }) =>
      ({date, data:newCasesBySpecimenDateAgeDemographics}))

    return {covidData};
  }
);
