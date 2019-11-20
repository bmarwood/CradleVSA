import React, {Component} from 'react';
import Popup from "reactjs-popup";
import AssessmentList from "../components/AssessmentComponents/AssessmentList";

class RecentAssessmentPopup extends Component {
    render() {
        return (
            <Popup trigger={<button className="ui icon button"><i aria-hidden="true" className="clipboard icon"></i>
            </button>}
                   modal>
                {close => (
                    <div>
                        <a className="close" onClick={close}>
                            &times;
                        </a>
                        <AssessmentList {...this.props} />
                    </div>
                )}
            </Popup>
        );
    }
}

export default RecentAssessmentPopup;