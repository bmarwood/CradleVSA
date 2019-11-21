// All the rest of the content of the landing page is coming from 
import React, {Component} from 'react';
import heart from '../heart1.svg';

import '../App.css';

class VHTReport extends Component {
    
    render() {
        return (
            <div className="landing-form">
                <h1 style={{color: "white"}}> VHT Activity Report</h1>
                <h4 style={{color: "white"}}> Health Facility Location</h4>
                <h4 style={{color: "white"}}> Select VHT</h4>
                <h4 style={{color: "white"}}> Select Duration for the Report</h4>
                <h4 style={{color: "white"}}> From</h4>
                <h4 style={{color: "white"}}> To</h4>



            </div>

        );

    }

}


export default VHTReport;