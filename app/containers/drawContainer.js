import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import PropTypes from 'prop-types';

import PrintPreviewDialog from './../components/printPreviewDialog.jsx';
import DrawingComponent from './../components/drawingComponent.jsx';

import  {Button} from 'react-bootstrap';


class SketchContainer extends React.Component {
    constructor(props) {
        super(props);

        this.openPrintModal = this.openPrintModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.clear = this.clear.bind(this);
        this.addRectangles = this.addRectangles.bind(this);

        this.state = {
            isModalActive: false,
            modalContext: [],
            clearCanv: false,
        };
    }

    componentDidMount() {
        this.existingRectangles = [];
        this.props.actions.retrieveShapes();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.existingRectangles) {
            this.existingRectangles = nextProps.existingRectangles;
            this.setState({modalContext: this.existingRectangles});
        }
    }

    openPrintModal() {
        this.setState({
            isModalActive: true,
            modalContext: this.existingRectangles
        });
    }

    closeModal() {
        this.setState({ isModalActive: false });
    }

    clear() {
        this.existingRectangles = [];
        this.props.actions.persistShapes(this.existingRectangles);
        this.setState({modalContext: []});
    }

    addRectangles(rectangleCoordinates) {
        this.existingRectangles.push(rectangleCoordinates);
        this.props.actions.persistShapes(this.existingRectangles);
        this.setState({modalContext: this.existingRectangles});
    }

    render() {
        const { isModalActive, modalContext } = this.state;
        return (
        <div>
            <Button onClick={this.clear}>Clear Rectangles</Button>{'    '}
            <Button onClick={this.openPrintModal}>Print Preview</Button>
            <p/>
            <DrawingComponent
                data={modalContext}
                readOnly={false}
                addRectangles={this.addRectangles}
            />
            <PrintPreviewDialog
                active={isModalActive}
                data={modalContext}
                onClose={this.closeModal}
            />
        </div>

    );
    }
}

SketchContainer.propTypes = {
    actions: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        existingRectangles: state.shapes.rectangles
    };
};

const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(Actions, dispatch) });

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SketchContainer);
