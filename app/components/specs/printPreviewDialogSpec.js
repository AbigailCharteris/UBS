import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import PrintPreviewDialog from '../printPreviewDialog.jsx';

describe('PrintPreviewDialog component: ', () => {
    const props = {
        active: true,
        onClose: () => {},
        data: [{x: 0, y: 0, w: 100, h: 100}],
    };

    beforeEach(() => {});

    afterEach(() => {});

    it('Should render a Drawing component', () => {
        const wrapper = shallow(<PrintPreviewDialog {...props} />);
        expect(wrapper.find('DrawingComponent')).to.have.length(1);
    });
});
