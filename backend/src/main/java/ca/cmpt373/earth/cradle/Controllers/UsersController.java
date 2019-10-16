package ca.cmpt373.earth.cradle.Controllers;

import ca.cmpt373.earth.cradle.Models.Role;
import ca.cmpt373.earth.cradle.Models.Users;
import ca.cmpt373.earth.cradle.repository.RoleRepository;
import ca.cmpt373.earth.cradle.repository.UsersRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/users")
public class UsersController {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private RoleRepository roleRepository;

    private BCryptPasswordEncoder bCrypt = new BCryptPasswordEncoder();

    public UsersController(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @GetMapping("/all")
    //@CrossOrigin(origins = "*", allowedHeaders = "*")
    public List<Users> getAll() {
        List<Users> users = this.usersRepository.findAll();
        return users;
    }

    /*@GetMapping("/{user_id}")
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public Users getUsers(@PathVariable String id) {
        Users user = this.usersRepository.findById(id);
        return user;
    }*/


    @PutMapping
    public void insert(@RequestBody Users user) {
        this.usersRepository.insert(user);
    }

    @PostMapping("/add")
    @ResponseStatus(code = HttpStatus.CREATED)
    @CrossOrigin(origins = "http://localhost:8040")
    public Users add(@RequestBody Users candidate) {
        return usersRepository.save(candidate);
    }

    @PostMapping("/login")
    @ResponseStatus(code = HttpStatus.OK)
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<Users> validateLogin(@RequestBody Users candidate) {
        String candidateUsername = candidate.getUsername();
        String candidatePassword = candidate.getPassword();

        Users user = this.usersRepository.findByUsername(candidateUsername);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        String hashedPassword = user.getPassword();

        if (bCrypt.matches(candidatePassword, hashedPassword)) {
            return ResponseEntity.status(200).body(user);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }

    @PostMapping("/register")
    @ResponseStatus(code = HttpStatus.OK)
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<Users> register(@RequestBody Users user) {
        String workerId = user.getId();
        String name = user.getName();
        String username = user.getUsername();
        String password = user.getPassword();
        String dob = user.getDob();
        String address = user.getAddress();
        String gender = user.getGender();

        Set<Role> roles = new HashSet<>();
        Role newUserRole = new Role(workerId, "USER");
        roles.add(newUserRole);

        String hashedPassword = bCrypt.encode(password);

        try {
            this.usersRepository.save(new Users(workerId, username, hashedPassword, name, dob,
                    address, gender, roles));
//            roleRepository.save(newUserRole);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        return ResponseEntity.status(200).body(user);


    }


}
