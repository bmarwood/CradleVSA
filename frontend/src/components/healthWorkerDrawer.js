// All the rest of the content of the landing page is coming from 
import React, {Component} from 'react';
import {Navigation} from 'react-mdl';
import {Link} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export default function HealthWorkerDrawer() {
    return (
        <Navigation>
            <Link to ="/logout">Logout</Link>
            <Link to ="/newAssessment">New Assessment</Link>
            <Link to ="/newPatient">New Patient</Link>
            <Link to ="/profile">Profile</Link>
        </Navigation>
    )
}