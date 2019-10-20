import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import RequestServer from '../RequestServer';
//form for a new patient
class Profile extends Component {
    render() {
        return (
            <div className="landing-form">
                <h1>This is User Profile Page</h1>
            </div>
        );
    }
}

export default Profile;
