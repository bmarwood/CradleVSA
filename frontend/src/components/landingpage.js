// All the rest of the content of the landing page is coming from 
import React, {Component} from 'react';
import heart from '../heart1.svg';

import '../App.css';

class LandingPage extends Component {
    changePage () {
        if (localStorage.getItem('isLoggedIn') === 'true'){
            window.location.reload()
        }
        else{
            window.location.assign("/login")
        }
    }

    render() {
        return (
            <div className="landing-form">
                <h1 style={{color: "white"}}> Welcome to CRADLE</h1>
                <p style={{color: "white"}}>Cradle VSA provides Blood pressure monitoring and Gestational Tracking</p>
                <img src={heart} alt="logo" onClick={() => this.changePage()} />

            </div>

        );

    }

}


export default LandingPage;
