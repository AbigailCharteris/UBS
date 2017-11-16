import * as actionTypes from './actionTypes';
import * as storageApi from '../services/persistanceService';

const shapesRetrieved = (data) => ({ type: actionTypes.SHAPES_RETRIEVED, payload: { rectangles: data }});

export const retrieveShapes = () => {
    return (dispatch) => ( dispatch(shapesRetrieved(storageApi.retrieve())) );
};

export const persistShapes = data => {
    return () => ( storageApi.store(data) );
};
