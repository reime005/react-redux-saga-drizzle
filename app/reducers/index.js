import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import { drizzleReducers } from 'drizzle';

import * as types from '../actions/types';

const filter = (state = '', action) => {
    switch (action.type) {
        case types.FILTER:
            return action.filter;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    ...drizzleReducers,
    filter,
    routing
});

export default rootReducer;
