package ca.cmpt373.earth.cradle.document;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document(collection = "VHT")
public class VHT {
    String userName;
    String password;
    String location;
    String status; //active or not active

    ArrayList<String> healthCareConnections;
    int numPatients;
    ArrayList<Patient> patientList;

    int numAssessment;
    int numAssessmentToDo;
}
