import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCasesByAgeRange } from './covidAPI';

export const fetchCasesByAgeRange = createAsyncThunk(
  'covid/fetchCasesByArea',
  async () => {
    const cases = await getCasesByAgeRange();
    return {cases};
  }
);
