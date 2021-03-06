package ca.cmpt373.earth.cradle.Controllers;

import ca.cmpt373.earth.cradle.Models.Assessments;
import ca.cmpt373.earth.cradle.Models.Patients;
import ca.cmpt373.earth.cradle.repository.AssessmentsRepository;
import ca.cmpt373.earth.cradle.repository.PatientsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;


import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/patients")
public class PatientsController {

    @Autowired
    private PatientsRepository patientsRepository;

    @Autowired
    private AssessmentsRepository assessmentsRepository;

    @Autowired
    private AssessmentsController assessmentsController;

    private BCryptPasswordEncoder bCrypt = new BCryptPasswordEncoder();

    public PatientsController(PatientsRepository patientsRepository) {
        this.patientsRepository = patientsRepository;
    }

    @GetMapping("/all")
    @ResponseStatus(code = HttpStatus.OK)
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public List<Patients> getAll() {
        try {
            List<Patients> patients = this.patientsRepository.findAll();
            // return patients with updated assessment_list
            for (Patients eachPatient : patients) {
                String id = eachPatient.getId();
                List<Assessments> assessments = this.assessmentsController.getAByPatientId(id);
                eachPatient.setList_of_assessments(assessments);
            }
            return patients;
        } catch (Throwable e) {
            e.printStackTrace();
            return null;
        }
    }

    @GetMapping("/belongTo{pId}")
    @ResponseStatus(code = HttpStatus.OK)
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public List<Patients> getBelongTo( @PathVariable String pId) {
        try {
            List<Patients> patients = this.patientsRepository.findAll();
            List<Patients> toReturn = new ArrayList<>();
            // return patients with updated assessment_list
            for (Patients eachPatient : patients) {
                String vhtId = eachPatient.getVht_id();
                if (vhtId.equals(pId)) {
                    String id = eachPatient.getId();
                    List<Assessments> assessments = this.assessmentsController.getAByPatientId(id);
                    eachPatient.setList_of_assessments(assessments);
                    toReturn.add(eachPatient);
                }
            }

            return toReturn;
        } catch (Throwable e) {
            e.printStackTrace();
            return null;
        }
    }


    @PutMapping
    public void insert(@RequestBody Patients patient) {
        this.patientsRepository.insert(patient);
    }

    @PostMapping("/add")
    @ResponseStatus(code = HttpStatus.CREATED)
    @CrossOrigin(origins = "http://localhost:8040")
    public Patients add(@RequestBody Patients candidate) {
        try {
            return patientsRepository.save(candidate);
        } catch (Throwable e) {
            e.printStackTrace();
            return null;
        }
    }

    @GetMapping("/get{patient_id}")
    @ResponseStatus(code = HttpStatus.OK)
    @CrossOrigin(origins = "http://localhost:8040")
    public Patients get(@PathVariable String patient_id) {
        try {
            Patients patient = patientsRepository.findCustomById(patient_id);
            return patient;
        } catch (Throwable e) {
            e.printStackTrace();
            return null;
        }
    }

    //deleteWorks
    @DeleteMapping("/delete/{patient_id}")
    public String deleteById(@PathVariable String patient_id) {
        try {
            patientsRepository.deleteById(patient_id);
            return patient_id;
        } catch (Throwable e) {
            e.printStackTrace();
            return null;
        }
    }

    @PostMapping("/update/{id}")
    @ResponseStatus(code = HttpStatus.OK)
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<Patients> updatePatient(@RequestBody Patients patient) {
        try {
            this.patientsRepository.save(patient);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        return ResponseEntity.status(200).body(patient);
    }
}
