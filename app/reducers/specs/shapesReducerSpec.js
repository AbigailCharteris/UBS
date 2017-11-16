import {expect} from 'chai';
import reducer from '../shapes';
import * as actionTypes from '../../actions/actionTypes';

describe('Shapes reducer:', () => {
    const initialState = {
        rectangles: null
    };

    it('should return the initial state', () => {
        expect(reducer(initialState, {})).to.be.equal(initialState);
    });

    it('should handle action type SHAPES_RETRIEVED', () => {
        const action = {
            type: actionTypes.SHAPES_RETRIEVED,
            payload: {
                rectangles: [{x: 0, y: 0, w: 100, h: 100}]
            }
        };

        const expectedResult = {
            rectangles: [{x: 0, y: 0, w: 100, h: 100}]
        };

        expect(reducer(initialState, action)).to.be.eql(expectedResult);
    });
});
