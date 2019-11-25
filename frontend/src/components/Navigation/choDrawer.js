import React from 'react';
import {Navigation} from 'react-mdl';
import {Link} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export default function ChoDrawer() {
    return (
        <Navigation>
            <Link to="/logout">Logout</Link>
            <Link to="/newAssessment">New Assessment</Link>
            <Link to="/newPatient">New Patient</Link>
            <Link to="/newWorker">New Worker</Link>
            <Link to="/request-VHT-report">Request VHT Report</Link>
            <Link to="/profile">Profile</Link>
        </Navigation>
    )
}