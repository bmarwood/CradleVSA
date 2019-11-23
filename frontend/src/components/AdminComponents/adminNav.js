// All the rest of the content of the landing page is coming from 
import React from 'react';
import {Navigation} from 'react-mdl';
import {Link} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminNav() {
    return (
        <Navigation>
            <Link to="/">Home</Link>
            <Link to="/admin/landing">Admin Landing page</Link>
            <Link to="/PatientList">Patient List</Link>
            <Link to="/AssessmentList">Assessments List</Link>
            <Link to="/CommunityReport">CommunityReport</Link>
            <Link to="/Transfer">Transfer Patients</Link>
            <Link to="/Resources">Resources</Link>
        </Navigation>
    )
}