import createHistory from 'history/createBrowserHistory';
import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import { Drizzle } from 'drizzle';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';
import rootSaga from '../sagas';

export const history = createHistory();

const sagaMiddleware = createSagaMiddleware();

const middleware = [
    routerMiddleware(history),
    sagaMiddleware
];

export function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...middleware),
            DevTools.instrument()
        )
    );

    sagaMiddleware.run(rootSaga);

    const drizzle = new Drizzle({}, store);
    console.log(drizzle);

    return store;
}
