import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import casesReducer from '../features/cases/CasesSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    cases: casesReducer
  },
});
