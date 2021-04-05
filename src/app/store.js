import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {chosenRanges} from '../features/covid/ChosenRangesSlice'
import {covidData} from '../features/covid/CovidDataSlice'
import {source} from '../features/covid/SourceSlice';

export default configureStore({
  reducer: {
    covidData,
    chosenRanges,
    source
  },
  middleware: [...getDefaultMiddleware({immutableCheck: false, serializableCheck:false})]
});
