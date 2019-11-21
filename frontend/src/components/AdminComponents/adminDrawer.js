// All the rest of the content of the landing page is coming from 
import React from 'react';
import {Navigation} from 'react-mdl';
import {Link} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminDrawer() {
    return (
        <Navigation>
            <Link to="/admin-dashboard">My Dashboard</Link>
            <Link to="/newAssessment">New Assessment</Link>
            <Link to="/newPatient">New Patient</Link>
            <Link to="/newWorker">New Worker</Link>
            <Link to="/location">View Locations</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/vht-report">VHT Report</Link>
            <Link to="/logout">Logout</Link>
        </Navigation>
        
    )
}