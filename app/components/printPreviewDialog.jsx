import React from 'react';
import  {Modal, Button} from 'react-bootstrap';
import PropTypes from 'prop-types';
import  DrawingComponent from './drawingComponent.jsx';


export default class PrintPreviewDialog extends React.PureComponent {

    constructor() {
        super();

        this.onClose = this.onClose.bind(this);
        this.printDocument = this.printDocument.bind(this);
    }

    onClose() {
        this.props.onClose();
    }

    printDocument() {
      // TODO: Ran out of time to complete this
    }

    getActionButtons() {
        return (
          <div>
            <div>
              <Button value="Cancel" bsStyle="default" onClick={this.onClose}>
                Cancel
              </Button>
              <Button
                onClick={this.printDocument}
                bsStyle="primary">
                Print
              </Button>
            </div>
          </div>
        );
    }

    render() {
        const { active, data } = this.props;

        return (
        <Modal
          show={active}
          onHide={this.onClose}
        >
        <Modal.Header closeButton>
          <Modal.Title>
            Print Preview
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>

        <DrawingComponent
          data={data}
          readOnly
        />

        </Modal.Body>
        <Modal.Footer>{this.getActionButtons()}</Modal.Footer>
      </Modal>
    );
    }
}

PrintPreviewDialog.propTypes = {
    active: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
