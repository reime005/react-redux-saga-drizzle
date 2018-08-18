import { takeLatest, all, put, fork } from 'redux-saga/effects';
import { filterTable } from '../actions';
import { drizzleSagas } from 'drizzle';

export const OWN_SAGA_ACTION = 'OWN_SAGA_ACTION';

export const filterTableSaga = (filter) => (
    {
        type: OWN_SAGA_ACTION,
        filter
    }
);

function* filterGenerator(action) {
    const {
        filter
    } = action;

    yield put(filterTable(filter));
}

function* mainSaga() {
    yield all([
        takeLatest(OWN_SAGA_ACTION, filterGenerator),
    ]);
}

function startSagas(...sagas) {
    return function* rootSaga() {
        yield all(
          sagas.map(saga => fork(saga))
        );
    };
}

export const rootSaga = startSagas(...drizzleSagas, mainSaga);

export default rootSaga;
