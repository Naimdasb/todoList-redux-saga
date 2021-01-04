import { createStore, applyMiddleware } from "redux";
import { reducer } from "./reducer";
import mySaga from "../sagas/sagas";
import createMiddleware from "redux-saga";

const sagaMiddleware = createMiddleware();

export const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mySaga);
