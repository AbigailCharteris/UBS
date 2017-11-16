import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import shapes from './shapes';

const rootReducer = combineReducers({
    shapes,
    routing
});

export default rootReducer;
