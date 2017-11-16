import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';

class MainMenu extends PureComponent {
    render() {
        return (
            <div className={'main-menu'}>
                <Link to="/">Home</Link>
                <div>
                    <span>Select a shape to draw</span>
                    <Link to="/sketch/Rectangle">Rectangles</Link>
                    <Link to="/sketch/Circle">Circles</Link>
                </div>
            </div>
        );
    }
}

export default MainMenu;
