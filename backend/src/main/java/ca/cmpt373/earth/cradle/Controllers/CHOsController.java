package ca.cmpt373.earth.cradle.Controllers;

import ca.cmpt373.earth.cradle.Models.CHOs;
import ca.cmpt373.earth.cradle.repository.CHOsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chos")
public class CHOsController {

    @Autowired
    private CHOsRepository chosRepository;

    private BCryptPasswordEncoder bCrypt = new BCryptPasswordEncoder();

    public CHOsController(CHOsRepository vhtsRepository){
        this.chosRepository = vhtsRepository;
    }

    @GetMapping("/all")
    public List<CHOs> getAll(){
        List<CHOs> chos = this.chosRepository.findAll();
        return chos;
    }


    @PutMapping
    public void insert(@RequestBody CHOs chos){
        this.chosRepository.insert(chos);
    }

    @PostMapping("/add")
    @ResponseStatus(code = HttpStatus.CREATED)
    @CrossOrigin(origins = "http://localhost:8043")
    public CHOs add(@RequestBody CHOs candidate) {
        return chosRepository.save(candidate);
    }

    @GetMapping("/get{cho_id}")
    @ResponseStatus(code = HttpStatus.OK)
    @CrossOrigin(origins = "http://localhost:8043")
    public CHOs get(@PathVariable String cho_id) {
        return chosRepository.findCustomById(cho_id);
    }
}
