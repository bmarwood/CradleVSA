// All the rest of the content of the landing page is coming from 
import React from 'react';
import {Navigation} from 'react-mdl';
import {Link} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export default function WorkerNav() {
    return (
        <Navigation>
            <Link to ="/">Home</Link>
            <Link to ="/PatientList">Patient List</Link>
            <Link to ="/AssessmentList">Assessments List</Link>
            <Link to ="/Resources">Resources</Link>
        </Navigation>
    )
}