import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {chosenAgeRanges} from '../features/covid/ChosenAgeRangesSlice'
import {covidData} from '../features/covid/CovidDataSlice'
import {source} from '../features/covid/SourceSlice';
import {loadingStatus} from '../features/covid/LoadingSlice';

export default configureStore({
  reducer: {
    covidData,
    chosenAgeRanges,
    source,
    loadingStatus
  },
  middleware: [...getDefaultMiddleware({immutableCheck: false, serializableCheck:false})]
});
