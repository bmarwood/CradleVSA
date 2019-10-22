// All the rest of the content of the landing page is coming from 
import React, {Component} from 'react';
import {Navigation} from 'react-mdl';
import {Link} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export default function LoggedOutNav() {
    return (
        <Navigation>
            <Link to ="/">Home</Link>
            <Link to ="/resources">Resources</Link>
        </Navigation>
    )
}