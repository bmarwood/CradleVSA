package ca.cmpt373.earth.cradle.update;

import ca.cmpt373.earth.cradle.Models.Patients;
import ca.cmpt373.earth.cradle.Models.Assessments;
import ca.cmpt373.earth.cradle.Controllers.AssessmentsController;
import ca.cmpt373.earth.cradle.repository.AssessmentsRepository;

import java.util.List;

public class UpdatePatients {

    private List<Patients> patients;
    private AssessmentsController assessmentsController;


    public UpdatePatients(AssessmentsController assessmentsController) {
        this.assessmentsController = assessmentsController;
    }

    //return list of patient List
    public List<Patients> getPatientsList() {
        return this.patients;
    }


    //update patient list
    public List<Patients> updateList(List<Patients> patients) {
        this.patients = patients;
        for (Patients eachPatient : this.patients) {
            String id = eachPatient.getId();
//            List<Assessments> assessments = this.assessmentsController.getAByPatientId(id);
//            eachPatient.setList_of_assessments(assessments);
        }
        return this.patients;

    }

}
