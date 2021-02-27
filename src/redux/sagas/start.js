import { put } from 'redux-saga/effects';
import * as actions from '../actions';

export function* start() {
    const date = new Date();

    yield put(actions.setTime(date));
}
