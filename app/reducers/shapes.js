import * as actionTypes from '../actions/actionTypes';

const initialState = {
    rectangles: null
};

const shapes = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHAPES_RETRIEVED:
            return {
                rectangles: action.payload.rectangles
            };

        default:
            return state;
    }
};

export default shapes;
