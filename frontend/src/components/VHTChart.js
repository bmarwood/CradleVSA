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
            chartData: {
                labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
                datasets: [
                    {
                        label: "Assessments Per Month",
                        fill: true,
                        backgroundColor: "rgba(255, 157, 148, .3)",
                        borderColor: "red",
                        data: [
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                        ]
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
            },
            assessmentList: props.assessmentList,
        }
    }

    componentDidMount() {
        if (this.propsNotEmpty) {
            this.getData()
        }
    }

    getData() {
        var assessmentArray = this.props.assessmentList
        var data = this.state.chartData.datasets[0].data
        assessmentArray.forEach(assessment => {
            var dateString = assessment.date
            let date = new Date(dateString)
            var month = date.getMonth()
            var index = 0


            var count = data[month]++
            data[index] = count

        })

        var state = { ...this.state }
        state.chartData.datasets[0].data = data
        this.setState({
            state
        }, () => { console.log("state: ", this.state) })
    }

    propsNotEmpty() {
        if (this.props.assessmentList != undefined || this.props.assessmentList != []) {
            return true
        }
        return false
    }

    render() {
        return (
            <MDBContainer style={{ backgroundColor: 'white' }}>
                <h3 className="mt-5">{this.props.patient_name}</h3>
                <Line data={this.state.chartData} options={{ responsive: true }} />
            </MDBContainer>
        );

    }
}

export default VHTChart;