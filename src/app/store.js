import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import casesReducer from '../features/cases/CasesSlice';
import {chosenRanges} from '../features/cases/ChosenRangesSlice'
import {deaths} from '../features/cases/DeathsSlice';
import {source} from '../features/cases/SourceSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    cases: casesReducer,
    chosenRanges,
    deaths,
    source
  },
  middleware: [...getDefaultMiddleware({immutableCheck: false, serializableCheck:false})]
});
