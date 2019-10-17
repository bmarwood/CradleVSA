// All the rest of the content of the landing page is coming from 
import React, {Component} from 'react';
import heart from '../heart1.svg';
<<<<<<< HEAD
=======
import report from '../report.svg';
>>>>>>> f20e2650bfab4836e7357168714cc08456bd5583

import '../App.css';

class LandingPage extends Component {
    render() {
        return (
            <div className="landing-form">
                <h1 style={{color: "white"}}> Welcome to CRADLE</h1>
                <p style={{color: "white"}}>Our platform provides gestational monitoring for pregnant woman</p>
                <img src={heart} alt="logo"/>
            </div>
        );
    }
}

export default LandingPage;
