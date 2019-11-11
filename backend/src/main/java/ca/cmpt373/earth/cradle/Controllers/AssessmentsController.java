package ca.cmpt373.earth.cradle.Controllers;

import ca.cmpt373.earth.cradle.Models.Assessments;
import ca.cmpt373.earth.cradle.Models.Medications;
import ca.cmpt373.earth.cradle.Models.Patients;
import ca.cmpt373.earth.cradle.repository.AssessmentsRepository;
import ca.cmpt373.earth.cradle.repository.PatientsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/assessments")
public class AssessmentsController {

    @Autowired
    private AssessmentsRepository assessmentsRepository;

    @Autowired
    private PatientsRepository patientsRepository;

    @Autowired
    private PatientsController patientsController;

    private BCryptPasswordEncoder bCrypt = new BCryptPasswordEncoder();

    public AssessmentsController(AssessmentsRepository assessmentsRepository) {
        this.assessmentsRepository = assessmentsRepository;
    }


    @GetMapping("/all")
    @ResponseStatus(code = HttpStatus.OK)
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public List<Assessments> getAll() {
        List<Assessments> assessments = null;
        try {
            assessments = this.assessmentsRepository.findAll();
        } catch (Exception e) {
            e.printStackTrace(); //for debugging
        }
        return assessments;
    }

    @PutMapping
    public void insert(@RequestBody Assessments assessment) {
        this.assessmentsRepository.insert(assessment);
    }

    @PostMapping("/add")
    @ResponseStatus(code = HttpStatus.CREATED)
    @CrossOrigin(origins = "http://localhost:8040")
    public Assessments add(@RequestBody Assessments assessment) {
        Assessments testdata = assessment;
        List<Assessments> list_of_assessments = new ArrayList<>();
        List<Medications> list_of_medications = new ArrayList<>();

        String patient_id = assessment.getPatient_id();

        Patients new_patient = new Patients(patient_id, assessment.getName(), assessment.getBirth_date(), list_of_assessments, "FEMALE"//need to update
                , assessment.getVht_id(), list_of_medications);
        if (patientsController.get(patient_id) == null) {
            patientsController.add(new_patient);
        }

        return assessmentsRepository.save(assessment);
    }

    @GetMapping("/get{assessment_id}")
    @ResponseStatus(code = HttpStatus.OK)
    @CrossOrigin(origins = "http://localhost:8040")
    public Assessments get(@PathVariable String assessment_id) {
        return assessmentsRepository.findCustomById(assessment_id);
    }

    //vht_id
    @GetMapping("/getByUserId{user_id}")
    @ResponseStatus(code = HttpStatus.OK)
    @CrossOrigin(origins = "http://localhost:8040")
    public List<Assessments> getByUserId(@PathVariable String user_id) {
        return assessmentsRepository.findByUserId(user_id);
    }

    //patient_id
    @GetMapping("/getAByPatientId{patient_id}")
    @ResponseStatus(code = HttpStatus.OK)
    @CrossOrigin(origins = "http://localhost:8040")
    public List<Assessments> getAByPatientId(@PathVariable String patient_id) {
        return assessmentsRepository.findByPatientId(patient_id);
    }

}
