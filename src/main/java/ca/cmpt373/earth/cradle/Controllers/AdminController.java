package ca.cmpt373.earth.cradle.Controllers;

import ca.cmpt373.earth.cradle.Models.Users;
import ca.cmpt373.earth.cradle.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UsersRepository usersRepository;

    @GetMapping("/users/all")
    //@CrossOrigin(origins = "*", allowedHeaders = "*")
    public List<Users> getAll(){
        List<Users> users = this.usersRepository.findAll();
        return users;
    }

    @PostMapping("/users/add")
    @ResponseStatus(code = HttpStatus.CREATED)
    @CrossOrigin(origins = "http://localhost:3000")
    public Users add(@RequestBody Users candidate) {
        return usersRepository.save(candidate);
    }
}
