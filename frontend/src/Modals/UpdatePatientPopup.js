import React, {Component} from 'react';
import Popup from "reactjs-popup";
import EditIcon from '@material-ui/icons/Edit';
import NewPatient from "../components/NewForm/NewPatient";
import IconButton from "@material-ui/core/IconButton";


class UpdatePatientPopup extends Component {
    render() {
        return (
            <Popup trigger={

                <IconButton aria-label="update">
                    <EditIcon fontSize="small"/>
                </IconButton>}
                   modal>
                {close => (
                    <NewPatient {...this.props} />
                )}
            </Popup>
        );
    }
}

export default UpdatePatientPopup;