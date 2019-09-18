package ca.cmpt373.earth.cradle.resources;

import ca.cmpt373.earth.cradle.document.Patient;
import ca.cmpt373.earth.cradle.repository.PatientRepository;
import ca.cmpt373.earth.cradle.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/patients")
public class PatientController {
    @Autowired
    private PatientRepository patientRepository;

    public PatientController(PatientRepository patientRepository){
        this.patientRepository = patientRepository;
    }

    @GetMapping("/all")
    public List<Patient> getAll(){
        List<Patient> patients = this.patientRepository.findAll();
        return patients;
        //return "Hello all";
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hi, the time at the server is now " + new Date() + "\n";
    }

    @PutMapping
    public void insert(@RequestBody Patient patient){
        this.patientRepository.insert(patient);
    }

    @PostMapping("/add")
    @ResponseStatus(code = HttpStatus.CREATED)
    public Patient add(@RequestBody Patient patient) {
        return patientRepository.save(patient);
    }
}
