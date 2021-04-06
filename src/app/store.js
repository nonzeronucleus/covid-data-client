import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {chosenRanges} from '../features/covid/ChosenRangesSlice'
import {covidData} from '../features/covid/CovidDataSlice'
import {source} from '../features/covid/SourceSlice';
import {loadingStatus} from '../features/covid/LoadingSlice';

export default configureStore({
  reducer: {
    covidData,
    chosenRanges,
    source,
    loadingStatus
  },
  middleware: [...getDefaultMiddleware({immutableCheck: false, serializableCheck:false})]
});
