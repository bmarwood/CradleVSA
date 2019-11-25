// All the rest of the content of the landing page is coming from 
import React from 'react';
import {Navigation} from 'react-mdl';
import {Link} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export default function WorkerNav() {
    return (
        <Navigation>
            <Link to="/user-dashboard">My Dashboard</Link>
            <Link to="/profile">Profile</Link>
            <Link to ="/resources">Resources</Link>
            <Link to="/logout">Logout</Link>
        </Navigation>
    )
}