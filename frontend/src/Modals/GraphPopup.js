import React, { Component } from 'react';
import Popup from "reactjs-popup";
import PatientChart from '../components/PatientComponents/PatientChart';

class GraphPopup extends Component {
    render() {
        return (
            <Popup trigger={<button className="ui icon button"><i aria-hidden="true" className="line graph icon"></i></button>}
                modal>
                {close => (<PatientChart {...this.props} />)}
            </Popup >
        );
    }
}
export default GraphPopup;
