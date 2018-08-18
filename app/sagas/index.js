import { takeLatest, all, put } from 'redux-saga/effects';
import { filterTable } from '../actions';

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

const rootSaga = function* root() {
    yield all([
        takeLatest(OWN_SAGA_ACTION, filterGenerator),
    ]);
};

export default rootSaga;
