package ca.cmpt373.earth.cradle.resources;

import ca.cmpt373.earth.cradle.document.Patient;
import ca.cmpt373.earth.cradle.document.VHT;
import ca.cmpt373.earth.cradle.repository.PatientRepository;
import ca.cmpt373.earth.cradle.repository.UsersRepository;
import ca.cmpt373.earth.cradle.repository.VHTRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/vht")
public class VHTController {
    @Autowired
    private VHTRepository vhtRepository;

    public VHTController(VHTRepository vhtRepository){
        this.vhtRepository = vhtRepository;
    }

    @GetMapping("/all")
    public List<VHT> getAll(){
        List<VHT> vhts = this.vhtRepository.findAll();
        return vhts;
        //return "Hello all";
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hi, the time at the server is now " + new Date() + "\n";
    }

    @PutMapping
    public void insert(@RequestBody VHT vht){
        this.vhtRepository.insert(vht);
    }

    @PostMapping("/add")
    @ResponseStatus(code = HttpStatus.CREATED)
    public VHT add(@RequestBody VHT vht) {
        return vhtRepository.save(vht);
    }
}
