import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import DrawingComponent from '../DrawingComponent.jsx';

describe('DrawingComponent component: ', () => {
    const props = {
        data: [{x: 0, y: 0, w: 100, h: 100}],
        readOnly: false,
        addRectangle: () => {}
    };

    beforeEach(() => {});

    afterEach(() => {});

    it('Should render a canvas', () => {
        const wrapper = shallow(<DrawingComponent {...props} />);
        expect(wrapper.find('canvas')).to.have.length(1);
    });

    it('Should calculate limitCheck', () => {
        const wrapper = shallow(<DrawingComponent {...props} />);

        wrapper.instance().existingRectangles = [{x: 0, y: 0, w: 100, h: 100}];
        const result = wrapper.instance().limitCheck(500);

        expect(result).to.equal(true);
    });
});
