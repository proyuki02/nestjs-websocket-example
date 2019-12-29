import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import counter from "./counter";
import sleeper from "./sleeper";

const reducer = combineReducers({
    counter: counter.reducer,
    sleeper: sleeper.reducer,
});

const middleware = [...getDefaultMiddleware(), logger];

const store = configureStore({
    reducer,
    middleware,
});

export default store;
