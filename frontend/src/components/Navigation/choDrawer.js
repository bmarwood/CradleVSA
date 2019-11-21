import React from 'react';
import {Navigation} from 'react-mdl';
import {Link} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export default function ChoDrawer() {
    return (
        <Navigation>
            <Link to="/newAssessment">New Assessment</Link>
            <Link to="/newPatient">New Patient</Link>
            <Link to="/newWorker">New Worker</Link>
            <Link to="/location">View Locations</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/logout">Logout</Link>
        </Navigation>
    )
}