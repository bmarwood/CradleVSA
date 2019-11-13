package ca.cmpt373.earth.cradle.Controllers;

import ca.cmpt373.earth.cradle.Models.Medications;
import ca.cmpt373.earth.cradle.Models.Patients;
import ca.cmpt373.earth.cradle.repository.PatientsRepository;
import ca.cmpt373.earth.cradle.repository.MedicationsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/medications")
public class MedicationsController {

    @Autowired
    private MedicationsRepository medicationsRepository;


    //     @GetMapping("/getMedicationByPatientId{patient_id}")
//     @ResponseStatus(code = HttpStatus.OK)
//     @CrossOrigin(origins = "http://localhost:8040")
//     public List<Medications> getMedicationByPatientId(@PathVariable String patient_id) {
//         return medicationsRepository.findByPatientId(patient_id);
//     }

    @GetMapping("/get{patient_id}")
    public List<Medications> getMedicationByPatientId(@PathVariable String patient_id) {
        return medicationsRepository.findByPatientId(patient_id);
    }

    //     @GetMapping("/all")
//     @ResponseStatus(code = HttpStatus.OK)
//     @CrossOrigin(origins = "*", allowedHeaders = "*")
//     public List<Medications> getAll() {
//         List<Medications> medications = null;
//         try {
//             medications = this.medicationsRepository.findAll();
//         } catch (Exception e) {
//             e.printStackTrace(); //for debugging
//         }
//         return medications;
//     }
    @GetMapping("/all")
    public List<Medications> getAll() {
        List<Medications> medications = this.medicationsRepository.findAll();
        return medications;
    }
    @PutMapping
    public void insert(@RequestBody Medications medications) {
        this.medicationsRepository.insert(medications);
    }

    @PostMapping("/add")
    @ResponseStatus(code = HttpStatus.CREATED)
    @CrossOrigin(origins = "http://localhost:8040")
    public Medications add(@RequestBody Medications candidate) {
        try {
            return medicationsRepository.save(candidate);
        } catch (Throwable e) {
            e.printStackTrace();
            return null;
        }
    }

}