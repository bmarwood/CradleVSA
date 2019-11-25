package ca.cmpt373.earth.cradle.Controllers;

import ca.cmpt373.earth.cradle.Models.Role;
import ca.cmpt373.earth.cradle.Models.Users;
import ca.cmpt373.earth.cradle.repository.RoleRepository;
import ca.cmpt373.earth.cradle.repository.UsersRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.*;

import static org.springframework.web.bind.annotation.RequestMethod.POST;


@RestController
@RequestMapping("/users")
public class UsersController {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private RoleRepository roleRepository;

    //private MongoTemplate mongoTemplate;

    private BCryptPasswordEncoder bCrypt = new BCryptPasswordEncoder();

    public UsersController(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @GetMapping("/all")
    //@CrossOrigin(origins = "*", allowedHeaders = "*")
    public List<Users> getAll() {
        try {
            List<Users> users = this.usersRepository.findAll();
            return users;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @GetMapping("/get{id}")
    @ResponseStatus(code = HttpStatus.OK)
    @CrossOrigin(origins = "http://localhost:8040")
    public Users get(@PathVariable String id) {
        return usersRepository.findUserById(id);
    }

    @PostMapping("/update/{id}")
    @ResponseStatus(code = HttpStatus.OK)
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<Users> updateUser(@RequestBody Users user) {
        try {
            this.usersRepository.save(user);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        return ResponseEntity.status(200).body(user);

    }


    @PostMapping("/updatePassword/{id}/{username}/{old_password}/{new_password}")
    @ResponseStatus(code = HttpStatus.OK)
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    public ResponseEntity<Users> updatePassword(@PathVariable String id, @PathVariable String username, @PathVariable String old_password, @PathVariable String new_password) {
        //Update user's password
        Users user = this.usersRepository.findByUsername(username);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } else {
            if (bCrypt.matches(old_password, user.getPassword())) {
                String hashedPassword = bCrypt.encode(new_password);
                user.setPassword(hashedPassword);
                try {
                    this.usersRepository.save(user);
                } catch (Exception e) {
                    e.printStackTrace();
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
                }
                return ResponseEntity.status(200).body(user);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }
        }
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
        //Only one id can exist - if id exist and change the username - possible (over-write)
        // .. if user's name exists for different id <-- error
        // .... unique user name only!!

        String workerId = user.getId();
        String name = user.getName();
        String username = user.getUsername();
        String password = user.getPassword();
        String dob = user.getDob();
        String address = user.getAddress();
//        Users.Gender gender = user.getGender();
        String gender = user.getGender();
        Set<Role> roles = user.getRoles();
        String manager_id = user.getManager_id();

        String hashedPassword = bCrypt.encode(password);

        try {
            this.usersRepository.save(new Users(workerId, username, hashedPassword, name, dob,
                    address, gender, roles,manager_id));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        return ResponseEntity.status(200).body(user);


    }

    @DeleteMapping("/delete/{userId}")
    public String deleteById(@PathVariable String userId) {
        usersRepository.deleteById(userId);
        return userId;
    }


}
