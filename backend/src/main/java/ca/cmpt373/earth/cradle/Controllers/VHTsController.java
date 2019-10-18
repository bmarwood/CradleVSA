package ca.cmpt373.earth.cradle.Controllers;

import ca.cmpt373.earth.cradle.Models.VHTs;
import ca.cmpt373.earth.cradle.repository.VHTsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vhts")
public class VHTsController {

    @Autowired
    private VHTsRepository vhtsRepository;

    private BCryptPasswordEncoder bCrypt = new BCryptPasswordEncoder();

    public VHTsController(VHTsRepository vhtsRepository) {
        this.vhtsRepository = vhtsRepository;
    }

    @GetMapping("/all")
    public List<VHTs> getAll() {
        List<VHTs> vhts = this.vhtsRepository.findAll();
        return vhts;
    }


    @PutMapping
    public void insert(@RequestBody VHTs vht) {
        this.vhtsRepository.insert(vht);
    }

    @PostMapping("/add")
    @ResponseStatus(code = HttpStatus.CREATED)
    @CrossOrigin(origins = "http://localhost:8040")
    public VHTs add(@RequestBody VHTs candidate) {
        return vhtsRepository.save(candidate);
    }

    @GetMapping("/get{vht_id}")
    @ResponseStatus(code = HttpStatus.OK)
    @CrossOrigin(origins = "http://localhost:8040")
    public VHTs get(@PathVariable String vht_id) {
        return vhtsRepository.findCustomById(vht_id);
    }


}
