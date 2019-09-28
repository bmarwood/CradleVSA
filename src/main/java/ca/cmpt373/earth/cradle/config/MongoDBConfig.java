package ca.cmpt373.earth.cradle.config;

import ca.cmpt373.earth.cradle.Models.Role;
import ca.cmpt373.earth.cradle.Models.Users;
import ca.cmpt373.earth.cradle.repository.RoleRepository;
import ca.cmpt373.earth.cradle.repository.UsersRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@EnableMongoRepositories(basePackageClasses = UsersRepository.class)

@Configuration
public class MongoDBConfig {

    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Bean
    CommandLineRunner commandLineRunner(UsersRepository usersRepository) {
        return strings -> {
            String hashedPassword = passwordEncoder.encode("password");

            Set<Role> roles = new HashSet<>();
            Role newAdminRole = new Role("3920101","ADMIN");
            roles.add(newAdminRole);
            Set<Role> roles2 = new HashSet<>();
            Role newUserRole = new Role("382828", "USER");
            roles2.add(newUserRole);

            usersRepository.save(new Users("3920101", "admin", hashedPassword, "Admin", "02/02/2002",
                    "8888 University Drive, Burnaby V3J 7H5", "MALE", roles));
            usersRepository.save(new Users("382828", "username", hashedPassword, "User", "12/02/1992",
                    "8888 University Drive, Burnaby V3J 7H5", "FEMALE", roles2));

        };
    }

    @Bean
    CommandLineRunner commandLineRunnerRole(RoleRepository roleRepository) {
        return strings -> {
            Role newAdminRole = new Role("3920101","ADMIN");
            roleRepository.save(newAdminRole);

            Role newUserRole = new Role("382828", "USER");
            roleRepository.save(newUserRole);
        };
    }



}
