import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import casesReducer from '../features/cases/CasesSlice';
import {chosenRanges} from '../features/cases/ChosenRangesSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    cases: casesReducer,
    chosenRanges
  },
  middleware: [...getDefaultMiddleware({immutableCheck: false, serializableCheck:false})]
});
