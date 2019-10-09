import React, {Component} from 'react';

import '../App.css';

class Resources extends Component {

    render() {
        return (
            <div className="resources">
                <h1 style={{color: "white", textAlign:'center'}}> Cradle Resources </h1>
                <p style={{color: "white", textAlign:'center'}}>Our platform provides gestational monitoring for pregnant woman</p>

                <div className="vid-container">
                    <div className = "block">
                        <iframe width="560"
                                height="315"
                                src="https://www.youtube.com/embed/QainNBCHKAg"
                                frameborder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                                </iframe>
                    </div>

                    <div className = "block" style = {{color:"white"}} >
                    A film introducing the CRADLE VSA, a new device for measuring vital signs during pregnancy.
                    This film shows how to check blood pressure and heart rate using the CRADLE VSA. It also outlines the first steps to take if there is an abnormality in these readings.
                    </div>
                </div>

            </div>
    );
    }
}

export default Resources;