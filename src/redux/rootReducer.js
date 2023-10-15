import { combineReducers } from '@reduxjs/toolkit';
import stationReducer from './stationReducer';

const rootReducer = combineReducers({
    stationReducer: stationReducer
});

export default rootReducer;