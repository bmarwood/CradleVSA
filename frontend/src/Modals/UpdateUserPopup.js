import React, {Component} from 'react';
import Popup from "reactjs-popup";
import EditIcon from '@material-ui/icons/Edit';
import NewUser from "../components/NewForm/NewUser";
import edit from '../edit-solid.svg';
import IconButton from "@material-ui/core/IconButton";


class UpdateUserPopup extends Component {
    render() {
        return (
            <Popup trigger={
                <IconButton aria-label="update">
                    <EditIcon fontSize="small"/>
                </IconButton>}
                   modal>
                {close => (
                    <NewUser {...this.props} />
                )}
            </Popup>
        );
    }
}

export default UpdateUserPopup;