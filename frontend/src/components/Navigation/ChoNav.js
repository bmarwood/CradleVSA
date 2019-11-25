// All the rest of the content of the landing page is coming from
import React from 'react';
import {Navigation} from 'react-mdl';
import {Link} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export default function ChoNav() {
    return (
        <Navigation>
            <Link to="/user-dashboard">Dashboard</Link>
            <Link to="/Resources">Resources</Link>
            <Link to="/logout">Logout</Link>
        </Navigation>
    )
}