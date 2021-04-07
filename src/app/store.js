import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {chosenAgeRanges} from '../features/AgeRanges/ChosenAgeRangesSlice'
import {covidData} from '../features/covid/CovidDataSlice'
import {source} from '../features/Sources/SourceSlice';
import {loadingStatus} from '../features/Loading/LoadingSlice';
import {chosenDateRanges} from '../features/DateRange/DateRangesSlice'

export default configureStore({
  reducer: {
    covidData,
    chosenAgeRanges,
    source,
    loadingStatus,
    chosenDateRanges
  },
  middleware: [...getDefaultMiddleware({immutableCheck: false, serializableCheck:false})]
});
