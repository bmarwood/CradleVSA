package ca.cmpt373.earth.cradle.Controllers;

import ca.cmpt373.earth.cradle.Models.Users;
import ca.cmpt373.earth.cradle.repository.UsersRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Role;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UsersController {

    @Autowired
    private UsersRepository usersRepository;

    private BCryptPasswordEncoder bCrypt = new BCryptPasswordEncoder();

    public UsersController(UsersRepository usersRepository){
        this.usersRepository = usersRepository;
    }

    //@Role(access="users")
    @GetMapping("/all")
    //@CrossOrigin(origins = "*", allowedHeaders = "*")
    public List<Users> getAll(){
        List<Users> users = this.usersRepository.findAll();
        return users;
        //return "Hello all";
    }

    /*@GetMapping("/{user_id}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public Users getUsers(@PathVariable String id) {
        Users user = this.usersRepository.findById(id);
        return user;
    }*/

    @GetMapping("/hello")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public String hello() {
        return "Hi, the time at the server is now " + new Date() + "\n";
    }

    @PutMapping
    public void insert(@RequestBody Users user){
        this.usersRepository.insert(user);
    }

    /*@PostMapping("/add")
    @ResponseStatus(code = HttpStatus.CREATED)
    @CrossOrigin(origins = "http://localhost:3000")
    public Users add(@RequestBody Users candidate) {
        return usersRepository.save(candidate);
    }*/

    @PostMapping("/login")
    @ResponseStatus(code = HttpStatus.OK)
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<Users> validateLogin(@RequestBody Users candidate) {
        String candidateUsername = candidate.getUsername();
        String candidatePassword = candidate.getPassword();

        Users user = this.usersRepository.findByUsername(candidateUsername);

        if (user == null) { return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); }

        String hashedPassword = user.getPassword();

        if (bCrypt.matches(candidatePassword, hashedPassword)) {
            return ResponseEntity.status(200).body(user);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }



}
