import React from "react";
import {Line} from "react-chartjs-2";
import {MDBContainer} from "mdbreact";
import RequestServer from '../RequestServer';
import Utility from '../NewForm/Utility';

class CommunityGraph extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataLine: [],
            data: []
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {
            // data: props.graph_array
            dataLine: {
                labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
                datasets: [
                    {
                        label: "Systolic",
                        fill: true,
                        backgroundColor: "rgba(255, 157, 148, .3)",
                        borderColor: "red",
                        data: props.array.systolic
                    },
                    {
                        label: "Diastolic",
                        fill: true,
                        backgroundColor: "rgba(97, 105, 255, .3)",
                        borderColor: "blue",
                        data: props.array.diastolic
                    },
                    {
                        label: "Heart Rate",
                        fill: true,
                        backgroundColor: "rgba(159, 255, 133, .3)",
                        borderColor: "Green",
                        data: props.array.heart_rate
                    }
                ]
            },
            options: {
                legend: {
                    labels: {
                        fontColor: "white"
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: "white",
                            fontSize: 15
                        }
                    }]
                }
            }
        };
    }

    render() {
        return (
            <MDBContainer style={{backgroundColor: 'white'}}>
                <h3 className="mt-5">{this.props.patient_name}</h3>
                <Line data={this.state.dataLine} options={{responsive: true}}/>
            </MDBContainer>
        );
    }
}

export default CommunityGraph;