import React from "react";
import Popup from "reactjs-popup";
import './AssessmentModal.css';

export default (props) => (

    <Popup trigger={<button class="ui icon button"><i aria-hidden="true" class="info circle icon"></i></button>} modal>
        {close => (
            < div className="modal">
                <a className="close" onClick={close}>
                    &times;
                </a>
                <h1>Asssessment ID: {props.id}</h1>
                <div className="content">
                    {" "}
                    Patient Name:
                    <br />
                    Date of Birth: {props.date}
                    <br />
                    Current Symptoms: {props.symptoms}
                    <br />
                    VHT Name: 
                    <br />
                    Heart Rate: {props.heart_rate}
                    <br/>
                    Diastolic: {props.diastolic}
                    <br />
                    Systolic: {props.systolic}
                </div>
                <div className="actions">
                    <Popup
                        trigger={<button class="ui black basic button"> See Patient </button>}
                        position="top center"
                        closeOnDocumentClick
                    >
                        <span>
                            This will navigate to the individual Patient page
                        </span>
                    </Popup>
                    <Popup
                        trigger={<button class="ui black basic button"> See VHT </button>}
                        position="top center"
                        closeOnDocumentClick
                    >
                        <span>
                            This will navigate to the individual VHT page
                        </span>
                    </Popup>
                </div>
            </div>
        )}
    </Popup >
);