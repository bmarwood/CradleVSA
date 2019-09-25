package ca.cmpt373.earth.cradle.config;

import ca.cmpt373.earth.cradle.Models.Assessments;
import ca.cmpt373.earth.cradle.Models.Users;
import ca.cmpt373.earth.cradle.repository.AssessmentsRepository;
import ca.cmpt373.earth.cradle.repository.UsersRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@EnableMongoRepositories(basePackageClasses = UsersRepository.class)

@Configuration
public class MongoDBConfig {

    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    @Bean
    CommandLineRunner commandLineRunner(UsersRepository usersRepository) {
        return strings -> {
            String hashedPassword = passwordEncoder.encode("password");

            usersRepository.save(new Users("4", "Peter", 4500.00, "username", hashedPassword));
            usersRepository.save(new Users("5", "Sam", 7500.00, "usernameB", hashedPassword));
        };
    }
    @Bean
    CommandLineRunner commandLineRunnerAssess(AssessmentsRepository assessmentsRepository) {
        return strings -> {
            assessmentsRepository.save(new Assessments("1", "22", "34yrs" , "ab11", "sept 24", "2 weeks", 72,68,44,"Green" ,
                    "cough", true, true, "next week monday", true ));
            assessmentsRepository.save(new Assessments("2", "44", "10yrs" , "ab11", "sept 25", "0 weeks", 44,90,10,"Red" ,
                    "sweating", true, true, "next week tuesday", true ));
        };
    }


}
