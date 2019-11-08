package ca.cmpt373.earth.cradle.Controllers;

import ca.cmpt373.earth.cradle.Models.Medications;
import ca.cmpt373.earth.cradle.Models.Patients;
import ca.cmpt373.earth.cradle.repository.PatientsRepository;
import ca.cmpt373.earth.cradle.repository.MedicationsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/medications")
public class MedicationsController {

    @Autowired
    private MedicationsRepository medicationsRepository;

    @Autowired
    private PatientsRepository patientsRepository;

    @Autowired
    private MedicationsController medicationsController;

    public MedicationsController(MedicationsRepository medicationsRepository) {
        this.medicationsRepository = medicationsRepository;
    }
   
     @GetMapping("/getAByPatientId{patient_id}")
     @ResponseStatus(code = HttpStatus.OK)
     @CrossOrigin(origins = "http://localhost:8040")
     public List<Medications> getAByPatientId(@PathVariable String patient_id) {
         return medicationsRepository.findByPatientId(patient_id);
     }

     @GetMapping("/all")
     @ResponseStatus(code = HttpStatus.OK)
     @CrossOrigin(origins = "*", allowedHeaders = "*")
     public List<Medications> getAll() {
         List<Medications> medications = null;
         try {
             medications = this.medicationsRepository.findAll();
         } catch (Exception e) {
             e.printStackTrace(); //for debugging
         }
         return medications;
     }

    
}