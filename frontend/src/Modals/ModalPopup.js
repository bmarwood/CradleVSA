import React, { Component } from 'react';
import Popup from "reactjs-popup";
import './ModalPopup.css';
import ModalAssessment from './ModalAssessment';

class ModalPopup extends Component {
    render() {
        return (
            <Popup trigger={<button className="ui icon button"><i aria-hidden="true" className="info circle icon"></i></button>}
                modal>
                {close => (
                    // <a className="close" onClick={close}>
                    //     &times;
                    // </a>
                    <ModalAssessment{...this.props} />


                )}
            </Popup >
        );
    }
}
export default ModalPopup;