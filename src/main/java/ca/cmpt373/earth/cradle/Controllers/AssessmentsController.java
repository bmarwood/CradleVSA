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

    public AssessmentsController(AssessmentsRepository assessmentsRepository){
        this.assessmentsRepository = assessmentsRepository;
    }

    @GetMapping("/assessall")
    public List<Assessments> getAll(){
        List<Assessments> assessments = this.assessmentsRepository.findAll();
        return assessments;
        //return "Hello all";
    }

    @PutMapping
    public void insert(@RequestBody Assessments assessment){
        this.assessmentsRepository.insert(assessment);
    }

    @PostMapping("/assessadd")
    @ResponseStatus(code = HttpStatus.CREATED)
    @CrossOrigin(origins = "http://localhost:3000")
    public Assessments add(@RequestBody Assessments candidate) {
        return assessmentsRepository.save(candidate);
    }


}
