import React from "react";
import {Line} from "react-chartjs-2";
import {MDBContainer} from "mdbreact";
import './PatientChart.css';
import '../Modals/GraphPopup';
import RequestServer from './RequestServer';


class PatientChart extends React.Component {
    /*
      state = {
        dataLine: {
          labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
          datasets: [
            {
              label: "Systolic",
              fill: true,
              backgroundColor: "rgba(255, 157, 148, .3)",
              borderColor: "red",
              data: [65, 59, 80, 81, 56, 55, 40, 50, 62, 81, 90, 100]
            },
            {
              label: "Diastolic",
              fill: true,
              backgroundColor: "rgba(97, 105, 255, .3)",
              borderColor: "blue",
              data: [60, 102, 98, 80, 86, 90, 90, 82, 91, 95, 85, 80]
            },
            {label: "Heart Rate",
              fill: true,
              backgroundColor: "rgba(159, 255, 133, .3)",
              borderColor: "Green",
              data: [80, 89, 98, 150, 86, 81, 90, 82, 91, 95, 120, 200]
          }
          ]

        },
        options: {
          legend:{
            labels:{
              fontColor: "white"
            }
          },
          scales:{
            yAxes:[{
              ticks:{
                fontColor: "white",
                fontSize: 15
              }
            }]
          }
        }
      };
    */
    constructor(props) {
        super(props);
        this.state = {
            dataLine: []
        }
    }

    componentDidMount() {
        this.getMatchingPatientID("TEST")
        this.timer = setInterval(() => this.getMatchingPatientID("TEST"), 10000);
        //this.getPatientList()
        //this.timer = setInterval(() => this.getPatientList(), 10000);

        this.setState({
            dataLine: {
                labels: ["Jan", "Feb", "March"],
                datasets: [
                    {
                        label: "Systolic",
                        fill: true,
                        backgroundColor: "rgba(255, 157, 148, .3)",
                        borderColor: "red",
                        data: []
                    },
                    {
                        label: "Diastolic",
                        fill: true,
                        backgroundColor: "rgba(97, 105, 255, .3)",
                        borderColor: "blue",
                        data: []
                    },
                    {
                        label: "Heart Rate",
                        fill: true,
                        backgroundColor: "rgba(159, 255, 133, .3)",
                        borderColor: "Green",
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

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }


    populateData(response) {
        console.log(response)
        var patientList = []
        /*
        var dataLine =
        {
          labels: ["Ja2435n", "Fe2435b"],
          datasets: [
            {
              label: "Systolic",
              fill: true,
              backgroundColor: "rgba(255, 157, 148, .3)",
              borderColor: "red",
              data: []
            }
      ]
        }
        */
        var dataLine = [];
        response.forEach(list_of_assessments => {
            //var list_of_assessments: data.list_of_assessments
            //window.alert(list_of_assessments)

            /*
              var name = (patient.name.split(" "))[0]
              var surname = (patient.name.split(" "))[1]
              var id = patient.id
              var labels = ["loading2", "loading 3"]
              var data = [2, 3]
              var label = patient.name

              var dataLine_obj = {
                dataLine: label,
                labels : labels,
                label: label,
                data: data
              }
              /*
              var dataLine_obj = {
                dataLine:{
                labels: labels,
                datasets : [
                  {
                    label: label,
                    fill: true,
                    backgroundColor: "rgba(255, 157, 148, .3)",
                    borderColor: "red",
                    data: data
                  }
                ]
              }
            }
            */
            patientList.push(dataLine)
        });

        this.setState({dataLine: dataLine})

    }

    /*
    //get a single patient with matching patient_id
    async getMatchingPatientID(patient_id) {
      var passback = await RequestServer.getPatientByID(patient_id)
      console.log(passback)
      if (passback !== null) {
          this.array = passback.data.list_of_assessments
          return passback.data.id
      }
      return null
    }
    */

    async getMatchingPatientID(patient_id) {
        var passback = await RequestServer.getPatientByID(patient_id)
        if (passback != null) {
            this.populateData(passback.data.list_of_assessments
            )
            console.log(passback.data.list_of_assessments)
            console.log("passback.data.list_of_assessments[0]")
            console.log(passback.data.list_of_assessments[0].heart_rate)
            window.alert(passback.data.list_of_assessments[0].heart_rate)
        }
    }

    async getPatientList() {
        var passback = await RequestServer.getPatientList()
        if (passback !== null) {
            this.populateData(passback.data)
        }
    }

    render() {
        return (
            <MDBContainer style={{backgroundColor: 'white'}}>
                <h3 className="mt-5">Blood Pressure and Heart Rate</h3>
                <Line data={this.state.dataLine} options={{responsive: true}}/>
            </MDBContainer>
        );
    }
}

export default PatientChart;