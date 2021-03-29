import { createAsyncThunk } from '@reduxjs/toolkit';
import { getByArea } from './casesAPI';
import { get } from 'lodash'
const casesText = 'newCasesBySpecimenDateAgeDemographics';

export const fetchCasesByArea = createAsyncThunk(
  'users/fetchCasesByArea',
  async (userId, thunkAPI) => {
    const response = await getByArea(userId);

    const records = response.data;
    let casesByAge = {};

    records.forEach(record => {
      const cases = get(record, casesText)
      cases.forEach(caseData => {
        const {age, rollingRate} = caseData;
        if(casesByAge[age]==null) {
          casesByAge[age]=[];
        }
        casesByAge[age].push({date:record.date,rollingRate});
      })
    })

    return {casesByAge};
  }
);
