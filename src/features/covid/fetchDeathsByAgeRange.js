import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDeathsByAgeRange } from './covidAPI';

export const fetchDeathsByAgeRange = createAsyncThunk(
  'covid/fetchDeathsByAgeRange',
  async () => {
    const deaths = await getDeathsByAgeRange();

    return {deaths};
  }
);
