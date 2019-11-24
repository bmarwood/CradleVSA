// All the rest of the content of the landing page is coming from 
import React from 'react';
import {Navigation} from 'react-mdl';
import {Link} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminDrawer() {
    return (
        <Navigation>
            <Link to="/admin-dashboard">My Dashboard</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/logout">Logout</Link>
            <br/>
            <h1 style = {{color: "blue"}}>PATIENTS RELATED</h1>
            <Link to="/newPatient">New Patient</Link>
            <Link to="/newAssessment">New Assessment</Link>
            <Link to="/Transfer">Transfer Patients</Link>
            <Link to="/AssessmentList">Assessments List</Link>
            <Link to="/ReferredList">Referral</Link>
            <Link to="/CommunityReport">Community Report</Link>
            <br/>
            <h1 style = {{color: "blue"}}>WORKERS RELATED</h1>
            <Link to="/newWorker">New Worker</Link>
            <Link to="/request-VHT-report">Request VHT Report</Link>
            <br/>
            <h1 style = {{color: "blue"}}>OTHERS</h1>
            <Link to="/location">View/Add Locations</Link>
            
        </Navigation>
        
    )
}