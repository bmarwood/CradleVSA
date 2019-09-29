import React from "react";
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

class PatientChart extends React.Component {
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
    }
  };

  render() {
    return (
      <MDBContainer>
        <h3 className="mt-5">Blood Pressure</h3>
        <Line data={this.state.dataLine} options={{ responsive: true }} />
      </MDBContainer>
    );
  }
}

export default PatientChart;