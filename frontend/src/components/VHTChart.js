import React from "react";
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import './PatientComponents/PatientChart.css';
import '../Modals/GraphPopup';
import RequestServer from './RequestServer';
import Utility from './NewForm/Utility';

class VHTChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataLine: [],
            assessmentList: props.assessmentList,
            loading: true
        }
    }

    componentDidMount() {
        this.doSomething()
        this.setState({
            dataLine: {
                labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
                datasets: [
                    {
                        label: "Assessments",
                        fill: true,
                        backgroundColor: "rgba(255, 157, 148, .3)",
                        borderColor: "red",
                        data: []
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
        })
    }


    populateData(assessmentList) {
        console.log("populateData: ", assessmentList)

        var dataLineArray = []
        var labels = []
        var assessmentData = []

        var datasets = [
            {
                label: "Assessment",
                fill: true,
                backgroundColor: "rgba(255, 157, 148, .3)",
                borderColor: "red",
                data: [assessmentData]
            },
        ]

        assessmentList.forEach(assessment => {
            //Array of dates
            labels.push(assessment.date)
            //3 Arrays for readings
            assessmentData.push(0.5)
            // assessmentData.push(assessment)

            var dataLine_obj = {
                labels: labels,
                datasets: datasets
            }

            console.log("dataset push", dataLine_obj)

            dataLineArray.push(dataLine_obj)
        });


        console.log("dataLineArray", dataLineArray[0])

        //Shows a blank page on graph if no list of assessments exists
        if (typeof dataLineArray[0] !== "undefined") {
            this.setState({ dataLine: dataLineArray[0], loading: false })
        }
        else {
            window.alert("No history found")
        }
    }

    async doSomething() {
        if (this.state.assessmentList != undefined || this.state.assessmentList != []) {
            //Converts dates in list_of_assessments to Date format to sort by date
            // this.populateData(this.state.assessmentList.sort(function (a, b) {
            //     a = Utility.convertStringToDate(a.date);
            //     b = Utility.convertStringToDate(b.date);
            //     return a > b ? 1 : a < b ? -1 : 0;
            // })
            // )
            this.populateData(this.props.assessmentList)
        }
    }

    render() {
        if (!this.state.loading) {
            return (
                <MDBContainer style={{ backgroundColor: 'white' }}>
                    <h3 className="mt-5">{this.props.patient_name}</h3>
                    <Line data={this.state.dataLine} options={{ responsive: true }} />
                </MDBContainer>
            );
        } else {
            return (
                <div></div>
            );
        }

    }
}

export default VHTChart;