import React, {Component} from 'react';
import Popup from "reactjs-popup";
import EditIcon from '@material-ui/icons/Edit';
import NewPatient from "../components/NewForm/NewPatient";
import IconButton from "@material-ui/core/IconButton";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height: '50%', // <-- This sets the height
        overflow: 'scroll' // <-- This tells the modal to scroll
    }
};

class UpdatePatientPopup extends Component {
    render() {
        return (
            <Popup style={customStyles} trigger={
                <IconButton aria-label="update">
                    <EditIcon fontSize="small"/>
                </IconButton>}
                   modal>
                {close => (
                    <div>
                        <a className="close" onClick={close}>
                            &times;
                        </a>
                        <NewPatient {...this.props} />
                    </div>
                )}
            </Popup>
        );
    }
}

export default UpdatePatientPopup;