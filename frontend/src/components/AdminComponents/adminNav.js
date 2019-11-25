// All the rest of the content of the landing page is coming from 
import React from 'react';
import {Navigation} from 'react-mdl';
import {Link} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminNav() {
    return (
        <Navigation>
            <Link to="/admin-dashboard">My Dashboard</Link>
            <Link to ="/resources">Resources</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/logout">Logout</Link>
        </Navigation>
    )
}