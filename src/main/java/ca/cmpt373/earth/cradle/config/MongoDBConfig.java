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
    @Bean
    CommandLineRunner commandLineRunner(UsersRepository usersRepository, RoleRepository roleRepository) {
        return args -> {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String hashedPassword = passwordEncoder.encode("password");
            Set<Role> roles = new HashSet<>();
            Role newAdminRole = new Role("3920101","ADMIN");
            roles.add(newAdminRole);
            Users newUser = new Users("3920101", "admin", hashedPassword, "Admin", "02/02/2002",
                    "8888 University Drive, Burnaby V3J 7H5", "MALE", roles);

            //newAdminRole.setRole("ADMIN");
            roleRepository.save(newAdminRole);
            //newUser.addRoles(new Role("3920101", "ADMIN"));
            usersRepository.save(newUser);
        };
    }


}
