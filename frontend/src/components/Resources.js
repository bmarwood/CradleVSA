import React, {Component} from 'react';

import '../App.css';

class Resources extends Component {

    render() {
        return (
            <div className="resources">
                <h1 style={{color: "white", textAlign:'center'}}> Cradle Resources and Training Videos</h1>

                <div className="vid-container">
                    <div className = "block">
                        <iframe width="672"
                                height="378"
                                src="https://www.youtube.com/embed/QainNBCHKAg"
                                frameborder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                                </iframe>
                    </div>
                    <div className = "block-text" style = {{color:"white"}} >
                        <p>A film introducing the CRADLE VSA, a new device for measuring vital signs during pregnancy.
                        This film shows how to check blood pressure and heart rate using the CRADLE VSA. It also outlines the first steps to take if there is an abnormality in these readings.</p>
                    </div>
                    <div className = "block">
                        <iframe width="672"
                                height="378"
                                src="https://www.youtube.com/embed/TTi3WWamINM"
                                frameborder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div className = "block-text" style = {{color:"white"}} >
                        <p>Microlife CRADLE Vital Sign Alert Tutorial - for trained health care providers</p>
                    </div>
                    <div className = "block">
                        <iframe width="672"
                                height="378"
                                src="https://www.youtube.com/embed/elLIcWDhi7Y"
                                frameborder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div className = "block-text" style = {{color:"white"}} >
                        <p>Microlife CRADLE Vital Sign Alert Tutorial - for health care providers with non traditional training</p>
                    </div>
                    <div className = "block">
                        <iframe width="672"
                                height="378"
                                src="https://www.youtube.com/embed/aL11ljB3S68"
                                frameborder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div className = "block-text" style = {{color:"white"}} >
                        <p>Tutorial on taking an accurate blood pressure measurement using the Microlife CRADLE Vital Sign Alert Device (VSA) - an accurate, user-friendly,
                            low-cost vital sign measuring device suitable for community healthcare provider use in pregnancy in low-resource settings. </p>
                    </div>

                </div>

            </div>
    );
    }
}

export default Resources;