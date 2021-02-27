import { takeLatest } from 'redux-saga/effects';
import * as actions from '../actions';
import {start} from './start';

function* sagas() {
    yield takeLatest(actions.start.getType(), start);
}

export default sagas;
