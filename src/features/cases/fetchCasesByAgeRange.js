import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCasesByAgeRange } from './covidAPI';

export const fetchCasesByAgeRange = createAsyncThunk(
  'users/fetchCasesByArea',
  async () => {
    const covidData = await getCasesByAgeRange();
    return {covidData};
  }
);
