package ca.cmpt373.earth.cradle.Controllers;

import ca.cmpt373.earth.cradle.Models.Patients;
import ca.cmpt373.earth.cradle.repository.PatientsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patients")
public class PatientsController {

    @Autowired
    private PatientsRepository patientsRepository;

    private BCryptPasswordEncoder bCrypt = new BCryptPasswordEncoder();

    public PatientsController(PatientsRepository patientsRepository) {
        this.patientsRepository = patientsRepository;
    }

    @GetMapping("/all")
    @ResponseStatus(code = HttpStatus.OK)
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public List<Patients> getAll() {
        List<Patients> patients = this.patientsRepository.findAll();
        return patients;
    }


    @PutMapping
    public void insert(@RequestBody Patients patient) {
        this.patientsRepository.insert(patient);
    }

    @PostMapping("/add")
    @ResponseStatus(code = HttpStatus.CREATED)
    @CrossOrigin(origins = "http://localhost:8040")
    public Patients add(@RequestBody Patients candidate) {
        return patientsRepository.save(candidate);
    }

    @GetMapping("/get{patient_id}")
    @ResponseStatus(code = HttpStatus.OK)
    @CrossOrigin(origins = "http://localhost:8040")
    public Patients get(@PathVariable String patient_id) {
        return patientsRepository.findCustomById(patient_id);
    }
}
