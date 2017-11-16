import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const VIEWPORT_WIDTH = 800;
const VIEWPORT_HEIGHT = 600;
const SHAPE_COLOR = '#000000';
const CANVAS_COLOR = '#5e8ddd';
const LIMIT_BREACH_COLOR = '#ff0000';

export default class DrawingComponent extends PureComponent {

    constructor(props) {
        super(props);

        this.drag = this.drag.bind(this);
        this.dragStart = this.dragStart.bind(this);
        this.dragStop = this.dragStop.bind(this);
        this.getCanvasCoordinates = this.getCanvasCoordinates.bind(this);
        this.drawRectangle = this.drawRectangle.bind(this);
        this.renderExistingRectangles = this.renderExistingRectangles.bind(this);
        this.canDraw = this.canDraw.bind(this);
        this.limitCheck = this.limitCheck.bind(this);
    }

    componentWillMount() {
        this.setState({
            dragging: false,
            dragStartLocation: {x: 0, y: 0},
            dragEndLocation: {x: 0, y: 0}
        });
    }

    componentDidMount() {
        this.existingRectangles = [];
        this.canvasHex.width = VIEWPORT_WIDTH;
        this.canvasHex.height = VIEWPORT_HEIGHT;

        this.context = this.canvasHex.getContext('2d');

        if(this.props.readOnly) {
            this.canvasHex.style.background = SHAPE_COLOR;
            this.context.globalCompositeOperation = 'difference';
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.data) {
            this.existingRectangles = nextProps.data;
            this.renderExistingRectangles();
        }
    }

    canDraw() {
        return this.existingRectangles && this.existingRectangles.length < 5;
    }

    dragStart(event) {
        this.canvasHex.style.cursor = 'crosshair';

        if(this.canDraw()) {
            this.setState({
                dragging: true,
                dragStartLocation: this.getCanvasCoordinates(event)
            });
        }
    }

    drag(event) {
        if(this.canDraw() && this.state.dragging) {
            const mouse = this.getCanvasCoordinates(event);
            this.drawRectangle(mouse);
        }
    }

    dragStop(event) {
        if(this.canDraw() && this.state.dragging) {
            const stopCoordinates = this.getCanvasCoordinates(event);
            this.setState({dragging: false,
                dragStopLocation: stopCoordinates
            }, () => this.drawRectangle());

            this.renderExistingRectangles();
        }
    }

    getCanvasCoordinates(event) {
        return{
            x: event.clientX - this.canvasHex.getBoundingClientRect().left,
            y: event.clientY - this.canvasHex.getBoundingClientRect().top
        };
    }

    drawRectangle(mouse = null) {
        const start = this.state.dragStartLocation;

        if(!this.state.dragging) {
            const stop = this.state.dragStopLocation;
            const width = stop.x - start.x;
            const height = stop.y - start.y;

            if(this.limitCheck(width)) {
                this.context.fillRect(start.x, start.y, width, height);
                this.addRectangle(start.x, start.y, width, height);
            }
        } else {
            const width = mouse.x - start.x;
            const height = mouse.y - start.y;

            if(this.limitCheck(width)) {
                this.context.fillStyle = SHAPE_COLOR;
                this.context.fillRect(start.x, start.y, width, height);
            } else {
                this.context.fillStyle = LIMIT_BREACH_COLOR;
                this.context.fillRect(start.x, start.y, width, height);
            }
        }
    }

    limitCheck(width) {
        const cumulativeExistingWidth = this.existingRectangles.length === 0
                                        ? 0
                                        : this.existingRectangles
                                            .map(r => r.w)
                                            .reduce((p, c) => { return Math.abs(p + c);});

        return (cumulativeExistingWidth + Math.abs(width) < VIEWPORT_WIDTH);
    }

    addRectangle(x, y, w, h) {
        if(this.existingRectangles && (this.existingRectangles.length + 1) < 6 ) {
            this.props.addRectangles({x, y, w, h});
        }
    }

    renderExistingRectangles() {
        if(this.existingRectangles && this.context && this.context.clearRect && this.context.fillStyle) {
            this.context.clearRect(0, 0, this.canvasHex.width, this.canvasHex.height);
            this.context.fillStyle = this.props.readOnly ? CANVAS_COLOR : SHAPE_COLOR;
            this.existingRectangles.forEach(rect => {
                this.context.fillRect(rect.x, rect.y, rect.w, rect.h);
            });
        }
    }


    editCanvas() {
        return (<canvas ref={ canvasHex => this.canvasHex = canvasHex }
    onMouseDown={this.dragStart}
    onMouseMove={this.drag}
    onMouseUp={this.dragStop}
    onMouseLeave={this.dragStop}
    />);
    }

    readonlyCanvas() {
        return(<canvas ref={ canvasHex => this.canvasHex = canvasHex }/>);
    }

    render() {
        const { readOnly } = this.props;
        return (
      <div>
         { readOnly ? this.readonlyCanvas() : this.editCanvas() }
      </div>
    );
    }
}

DrawingComponent.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    readOnly: PropTypes.bool.isRequired,
    addRectangle: PropTypes.func
};


