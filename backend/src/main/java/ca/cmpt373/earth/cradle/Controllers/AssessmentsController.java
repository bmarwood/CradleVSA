package ca.cmpt373.earth.cradle.Controllers;

import ca.cmpt373.earth.cradle.Models.Assessments;
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

        String patient_id = assessment.getPatient_id();

        //adding new patient
        Patients new_patient = new Patients(patient_id, assessment.getName(), assessment.getBirth_date(), list_of_assessments, assessment.getGender()
                , assessment.getCvsa_id());
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
    @GetMapping("/getByCVSAId{CVSA_id}")
    @ResponseStatus(code = HttpStatus.OK)
    @CrossOrigin(origins = "http://localhost:8040")
    public List<Assessments> getByCVSAId(@PathVariable String CVSA_id) {
        return assessmentsRepository.findByCVSAId(CVSA_id);
    }

    //vht_id
    @GetMapping("/filter/getByCVSAId{CVSA_id}/{from}/{to}")
    @ResponseStatus(code = HttpStatus.OK)
    @CrossOrigin(origins = "http://localhost:8040")
    public List<Assessments> getByCVSAIdByDate(@PathVariable String CVSA_id, @PathVariable String from, @PathVariable String to) {

        return assessmentsRepository.findByCVSAId(CVSA_id);
    }

    //patient_id
    @GetMapping("/getAByPatientId{patient_id}")
    @ResponseStatus(code = HttpStatus.OK)
    @CrossOrigin(origins = "http://localhost:8040")
    public List<Assessments> getAByPatientId(@PathVariable String patient_id) {
        return assessmentsRepository.findByPatientId(patient_id);
    }

    @GetMapping("/last/getByPatientId{patient_id}")
    @ResponseStatus(code = HttpStatus.OK)
    @CrossOrigin(origins = "http://localhost:8040")
    public Assessments getLastByPatientId(@PathVariable String patient_id) {
        List<Assessments> patientAssessments = assessmentsRepository.findByPatientId(patient_id);
        return patientAssessments.get(patientAssessments.size() - 1);
    }

    @GetMapping("/last/getByCVSAId{CVSA_id}")
    @ResponseStatus(code = HttpStatus.OK)
    @CrossOrigin(origins = "http://localhost:8040")
    public Assessments getLastByCVSAId(@PathVariable String CVSA_id) {
        List<Assessments> cvsaAssessments = assessmentsRepository.findByCVSAId(CVSA_id);
        return cvsaAssessments.get(cvsaAssessments.size() - 1);
    }
    //location_id
    @GetMapping("/getByLocation{location}")
    @ResponseStatus(code = HttpStatus.OK)
    @CrossOrigin(origins = "http://localhost:8040")
    public List<Assessments> getByPatientId(@PathVariable String location) {
        return assessmentsRepository.findByLocation(location);
    }

    @DeleteMapping("/delete/{assessment_id}")
    public String deleteById(@PathVariable String assessment_id) {
        try {
            assessmentsRepository.deleteById(assessment_id);
            return assessment_id;
        } catch (Throwable e) {
            e.printStackTrace();
            return null;
        }
    }

    //not working  need to research more
    @DeleteMapping("/deleteByPatientId/{patient_id}")
    public String deleteByPatientId(@PathVariable String patient_id) {
        try {
            assessmentsRepository.deleteAll(getAByPatientId(patient_id));
            return patient_id;
        } catch (Throwable e) {
            e.printStackTrace();
            return null;
        }
    }

    @GetMapping("/getAByDate{date}")
    @ResponseStatus(code = HttpStatus.OK)
    @CrossOrigin(origins = "http://localhost:8040")
    public List<Assessments> getAByDate(@PathVariable String date) {
        return assessmentsRepository.findByDate(date.substring(0, date.indexOf(' ')));
    }


    @GetMapping("/getReferred")
    @ResponseStatus(code = HttpStatus.OK)
    @CrossOrigin(origins = "http://localhost:8040")
    public List<Assessments> getReferred() {
        return assessmentsRepository.findByReferred();
    }

    @PostMapping("/updateReferral/{id}")
    @ResponseStatus(code = HttpStatus.OK)
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<Assessments> updatePatient(@PathVariable String id, @RequestBody Assessments assessments) {
        try {
            assessments.set_id(id);
            assessments.setReferred(false);
            this.assessmentsRepository.save(assessments);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return ResponseEntity.status(200).body(assessments);
    }

}
