package ca.cmpt373.earth.cradle.config;

import ca.cmpt373.earth.cradle.Models.CHOs;
import ca.cmpt373.earth.cradle.Models.Patients;
import ca.cmpt373.earth.cradle.Models.Users;
import ca.cmpt373.earth.cradle.Models.VHTs;
import ca.cmpt373.earth.cradle.repository.CHOsRepository;
import ca.cmpt373.earth.cradle.repository.PatientsRepository;
import ca.cmpt373.earth.cradle.repository.UsersRepository;
import ca.cmpt373.earth.cradle.repository.VHTsRepository;
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
    CommandLineRunner commandLineRunnerPatients(PatientsRepository patientsRepository) {
        return strings -> {
            String hashedPassword = passwordEncoder.encode("password");

            patientsRepository.save(new Patients("36", "Peter", "feb4 1996", "id of assessment 1, id of assessment2", "female"));
            patientsRepository.save(new Patients("5", "Sam", "dec1 1960", "null", "male"));

        };
    }
    @Bean
    CommandLineRunner commandLineRunnerVHTs(VHTsRepository vhtsRepository) {
        return strings -> {
            String hashedPassword = passwordEncoder.encode("password");

            vhtsRepository.save(new VHTs("115", "Bilbo Baggins", "id of patient 1", "id of assessment 1, id of assessment2"));
            vhtsRepository.save(new VHTs("54", "Gregor the Overlander", "id of patient 1, id of patient 2", "id of assessment 1, id of assessment2"));

        };
    }
    @Bean
    CommandLineRunner commandLineRunnerCHOs(CHOsRepository chosRepository) {
        return strings -> {
            String hashedPassword = passwordEncoder.encode("password");

            chosRepository.save(new CHOs("1105", "Bilbo Baggins", "id of vht 1,id of vht 2","id of patient 1", "id of assessment 1, id of assessment2"));
            chosRepository.save(new CHOs("540", "Gregor the Overlander", "","id of patient 1, id of patient 2", "id of assessment 1, id of assessment2"));

        };
    }


}
