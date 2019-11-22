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
                        label: "Assessment",
                        data: [
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                        ]
                    }
                ]
            },
            dataLine: [],
            assessmentList: props.assessmentList,
        }
    }

    componentDidMount() {
        this.doSomething()
        // this.setState({
        //     dataLine: {
        //         labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
        //         datasets: [
        //             {
        //                 label: "Assessments",
        //                 fill: true,
        //                 backgroundColor: "rgba(255, 157, 148, .3)",
        //                 borderColor: "red",
        //                 data: []
        //             }
        //         ]
        //     },
        //     options: {
        //         legend: {
        //             labels: {
        //                 fontColor: "white"
        //             }
        //         },
        //         scales: {
        //             yAxes: [{
        //                 ticks: {
        //                     fontColor: "white",
        //                     fontSize: 15
        //                 }
        //             }]
        //         }
        //     }
        // })
    }

    getData() {
        var array = this.props.assessmentList
        var data = this.state.chartData.datasets[0].data

        array.forEach(assessment => {
            var dateString = assessment.date
            let date = new Date(dateString)
            var month = date.getMonth()
            var index = 0

            switch (month) {
                case 1:
                    var count = data[index] + 1
                    data[index] = count
                    break;
                case 2:
                    index = 1
                    var count = data[index] + 1
                    data[index] = count
                    break;
                case 3:
                    index = 2
                    var count = data[index] + 1
                    data[index] = count
                    break;
                case 4:
                    index = 3
                    var count = data[index] + 1
                    data[index] = count
                    break;
                case 5:
                    index = 4
                    var count = data[index] + 1
                    data[index] = count
                    break;
                case 6:
                    index = 5
                    var count = data[index] + 1
                    data[index] = count
                    break;
                case 7:
                    index = 6
                    var count = data[index] + 1
                    data[index] = count
                    break;
                case 8:
                    index = 7
                    var count = data[index] + 1
                    data[index] = count
                    break;
                case 9:
                    index = 8
                    var count = data[index] + 1
                    data[index] = count
                    break;
                case 10:
                    index = 9
                    var count = data[index] + 1
                    data[index] = count
                    break;
                case 11:
                    index = 10
                    var count = data[index] + 1
                    data[index] = count
                    break;
                case 12:
                    index = 11
                    var count = data[index] + 1
                    data[index] = count
                    break;
            }

        })

        var state = {...this.state}
        state.chartData.datasets[0].data = data
        this.setState({
            state
        }, () => {console.log("state: ", this.state)})
    }


    populateData(assessmentList) {
        console.log("populateData: ", assessmentList)

        var dataLineArray = []
        var labels = []
        var assessmentData = []

        var datasets = [
            {
                label: "Assessment",
                // fill: true,
                // backgroundColor: "rgba(255, 157, 148, .3)",
                // borderColor: "red",
                data: assessmentData
            },
        ]



        assessmentList.forEach(assessment => {
            //Array of dates
            labels.push(assessment.date)
            //3 Arrays for readings
            // assessmentData.push(0.5)
            assessmentData.push(assessment)

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
            this.setState({ chartData: dataLineArray[0] })
        }
        else {
            window.alert("No history found")
        }
    }

    async doSomething() {
        if (this.props.assessmentList != undefined || this.props.assessmentList != []) {
            //Converts dates in list_of_assessments to Date format to sort by date
            // this.populateData(this.state.assessmentList.sort(function (a, b) {
            //     a = Utility.convertStringToDate(a.date);
            //     b = Utility.convertStringToDate(b.date);
            //     return a > b ? 1 : a < b ? -1 : 0;
            // })
            // )
            this.getData()
            // this.populateData(this.props.assessmentList)
        }
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