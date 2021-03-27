import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getByArea } from './casesAPI'
import { get } from 'lodash'

const casesText = 'newCasesBySpecimenDateAgeDemographics';
// const casesText = 'newDeaths28DaysByDeathDateAgeDemographics';
const caseByAge = 'caseByAge'
// const caseByAge = 'caseByAge'




// const

// First, create the thunk
export const fetchCasesByArea = createAsyncThunk(
  'users/fetchCasesByArea',
  async (userId, thunkAPI) => {
    const response = await getByArea(userId)
    return response.data
  }
)

// Then, handle actions in your reducers:
const casesSlice = createSlice({
  name: 'cases',
  initialState: {loading: 'idle' },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: {
    [fetchCasesByArea.fulfilled]: (state, action) => {
      const records = get(action,'payload');
      let caseByAge = {};

      records.forEach(record => {
        const cases = get(record, casesText)
        cases.forEach(caseData => {
          const {age, rollingRate} = caseData;
          if(caseByAge[age]==null) {
            caseByAge[age]=[];
          }
          caseByAge[age].push({date:record.date,rollingRate});
        })
      })

      const ageRanges=Object.keys(caseByAge).filter(a => a !== "unassigned");

      return {...state, caseByAge, ageRanges};
    }
  }
})

// export const selectCases = state => state.cases;
export const selectCasesByAge = state => get(state, "cases.caseByAge", {});
export const selectAgeRanges = state => get(state, "cases.ageRanges", []);

export default casesSlice.reducer;

// Later, dispatch the thunk as needed in the app
// dispatch(fetchUserById(123))