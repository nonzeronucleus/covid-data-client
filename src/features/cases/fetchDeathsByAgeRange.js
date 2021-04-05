import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDeathsByAgeRange } from './covidAPI';

export const fetchDeathsByAgeRange = createAsyncThunk(
  'covid/fetchDeathsByAgeRange',
  async () => {
    const covidData = await getDeathsByAgeRange();

    return {covidData};
  }
);
