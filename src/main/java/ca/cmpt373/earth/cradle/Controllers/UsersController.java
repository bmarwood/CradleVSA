package ca.cmpt373.earth.cradle.Controllers;

import ca.cmpt373.earth.cradle.Models.Users;
import ca.cmpt373.earth.cradle.repository.UsersRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

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
    @CrossOrigin(origins = "http://localhost:3000")
    public Users add(@RequestBody Users candidate) {
        return usersRepository.save(candidate);
    }


    @PostMapping("/login")
    @CrossOrigin(origins = "http://localhost:3000")
    @ResponseStatus(code = HttpStatus.OK)
    public ResponseEntity<Users> validateLogin(@RequestBody Users candidate) {
        String candidateUsername = candidate.getUsername();
        String candidatePassword = candidate.getPassword();

        List<Users> users = this.usersRepository.findAll();
        for (Users user : users ) {
            String usern = user.getUsername();
            String pass = user.getPassword();
            if (usern.equals(candidateUsername) && pass.equals(candidatePassword) ) {
                return ResponseEntity.status(200).body(user);
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }



}
