package ca.cmpt373.earth.cradle.resources;

import ca.cmpt373.earth.cradle.document.Users;
import ca.cmpt373.earth.cradle.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UsersController {

    @Autowired
    private UsersRepository usersRepository;

    public UsersController(UsersRepository usersRepository){
        this.usersRepository = usersRepository;
    }

    @GetMapping("/all")
    public List<Users> getAll(){
        List<Users> users = this.usersRepository.findAll();
        return users;
        //return "Hello all";
    }

    @GetMapping("/hello")
    public String hello() {
        return "Hi, the time at the server is now " + new Date() + "\n";
    }

    @PutMapping
    public void insert(@RequestBody Users user){
        this.usersRepository.insert(user);
    }

    @PostMapping("/add")
    @ResponseStatus(code = HttpStatus.CREATED)
    public Users add(@RequestBody Users candidate) {
        return usersRepository.save(candidate);
    }
}
