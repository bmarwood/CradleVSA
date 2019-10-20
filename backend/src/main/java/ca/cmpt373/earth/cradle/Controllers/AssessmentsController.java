package ca.cmpt373.earth.cradle.Controllers;

import ca.cmpt373.earth.cradle.Models.Assessments;
import ca.cmpt373.earth.cradle.repository.AssessmentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/assessments")
public class AssessmentsController {

    @Autowired
    private AssessmentsRepository assessmentsRepository;

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
    public Assessments add(@RequestBody Assessments candidate) {
        return assessmentsRepository.save(candidate);
    }

    @GetMapping("/get{assessment_id}")
    @ResponseStatus(code = HttpStatus.OK)
    @CrossOrigin(origins = "http://localhost:8040")
    public Assessments get(@PathVariable String assessment_id) {
        return assessmentsRepository.findCustomById(assessment_id);
    }
}
