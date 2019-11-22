// All the rest of the content of the landing page is coming from 
import React, {Component} from 'react';
import pika from '../surprised_pikachu.svg';

import '../App.css';

class NoMatchPage extends Component {
    render() {
        return (
            <div className="No-Map" >
                <h1> 404: Page Not Found</h1>
                <img  src={pika}/>
            </div>

        );

    }

}


export default NoMatchPage;
