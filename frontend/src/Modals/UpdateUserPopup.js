import React, {Component} from 'react';
import Popup from "reactjs-popup";
import EditIcon from '@material-ui/icons/Edit';
import NewUser from "../components/NewForm/NewUser";
import IconButton from "@material-ui/core/IconButton";

var customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        height: '500px', // <-- This sets the height
        overflow: 'scroll' // <-- This tells the modal to scrol
    }
};

class UpdateUserPopup extends Component {
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
                        <NewUser {...this.props} />
                    </div>
                )}
            </Popup>
        );
    }
}

export default UpdateUserPopup;