// All the rest of the content of the landing page is coming from 
import React from 'react';
import {Navigation} from 'react-mdl';
import {Link} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export default function HealthWorkerDrawer() {
    return (
        <Navigation>
            <h1 style = {{color: "blue"}}>PATIENTS RELATED</h1>
            <Link to="/newPatient">New Patient</Link>
            <Link to="/newAssessment">New Assessment</Link>
            <Link to="/ReferredList">Referral</Link>
            <br/>
            <h1 style = {{color: "blue"}}>WORKERS RELATED</h1>
            <Link to="/newWorker">New Worker</Link>
            <br/>
            <h1 style = {{color: "blue"}}>OTHERS</h1>
            <Link to="/location">View/Add Locations</Link>
        </Navigation>
    )
}