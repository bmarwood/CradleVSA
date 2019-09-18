package ca.cmpt373.earth.cradle.config;

import ca.cmpt373.earth.cradle.document.Users;
import ca.cmpt373.earth.cradle.repository.UsersRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableMongoRepositories(basePackageClasses = UsersRepository.class)
@Configuration
public class MongoDBConfig {

    @Bean
    CommandLineRunner commandLineRunner(UsersRepository userRepository) {
        return strings -> {
            userRepository.save(new Users("4", "Peter", 4500.00));
            userRepository.save(new Users("5", "Sam", 7500.00));
        };
    }


}
