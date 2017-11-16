import {expect} from 'chai';
// import sinon from 'sinon';
// import proxyquire from 'proxyquire';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actionTypes from '../actionTypes';
import * as actions from '../index';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Actions component: ', () => {
    it('should generate action', () => {
        const expectedActions = [actionTypes.SHAPES_RETRIEVED];

        const store = mockStore({});

        store.dispatch(actions.retrieveShapes);

        const storeActions = store.getActions();
        // console.log(`storeActions: ${storeActions}`);

        expect(storeActions).to.be.eql(expectedActions);
    });
});


