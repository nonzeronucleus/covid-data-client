import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import casesReducer from '../features/covid/CasesSlice';
import {chosenRanges} from '../features/covid/ChosenRangesSlice'
import {covidData} from '../features/covid/CovidDataSlice'
import {deaths} from '../features/covid/DeathsSlice';
import {source} from '../features/covid/SourceSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    cases: casesReducer,
    covidData,
    chosenRanges,
    deaths,
    source
  },
  middleware: [...getDefaultMiddleware({immutableCheck: false, serializableCheck:false})]
});
