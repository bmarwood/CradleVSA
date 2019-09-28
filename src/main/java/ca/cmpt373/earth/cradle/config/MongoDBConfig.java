package ca.cmpt373.earth.cradle.config;

import ca.cmpt373.earth.cradle.Models.CHOs;
import ca.cmpt373.earth.cradle.Models.Patients;
import ca.cmpt373.earth.cradle.Models.Users;
import ca.cmpt373.earth.cradle.Models.VHTs;
import ca.cmpt373.earth.cradle.repository.CHOsRepository;
import ca.cmpt373.earth.cradle.repository.PatientsRepository;
import ca.cmpt373.earth.cradle.Models.Assessments;
import ca.cmpt373.earth.cradle.Models.Users;
import ca.cmpt373.earth.cradle.repository.AssessmentsRepository;
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
    CommandLineRunner commandLineRunnerAssess(AssessmentsRepository assessmentsRepository) {
        return strings -> {
            assessmentsRepository.save(new Assessments("1", "22", "34yrs" , "ab11", "sept 24", "2 weeks", 72,68,44,"Green" ,
                    "cough", true, true, "next week monday", true ));
            assessmentsRepository.save(new Assessments("2", "44", "10yrs" , "ab11", "sept 25", "0 weeks", 44,90,10,"Red" ,
                    "sweating", true, true, "next week tuesday", true ));
            assessmentsRepository.save(new Assessments("4", "1", "44yrs" , "777", "sept 24, 2019", "0 weeks", 80,105,70,"Red" ,
                    "sings not well, and keeps singing christmas songs", true, true, "next week tuesday", true ));
            assessmentsRepository.save(new Assessments("5", "1", "44yrs" , "777", "sept 24, 2019", "0 weeks", 82,110,80,"Yellow" ,
                    "keeps singing christmas songs", true, true, "next week tuesday", false ));
            assessmentsRepository.save(new Assessments("6", "1", "44yrs" , "777", "sept 26, 2019", "0 weeks", 74,127,84,"Green" ,
                    "sings well", true, false, null, false ));
        };
    }

    @Bean
    CommandLineRunner commandLineRunnerPatients(PatientsRepository patientsRepository) {
        return strings -> {
            String hashedPassword = passwordEncoder.encode("password");

            patientsRepository.save(new Patients("36", "Peter", "feb4 1996", new String[]{"id of assessment 1", "id of assessment2"}, "female"));
            patientsRepository.save(new Patients("5", "Sam", "dec1 1960", new String[]{"id of assessment 1", "id of assessment2"}, "male"));
            patientsRepository.save(new Patients("1", "Michael Bublé", "September 9, 1975", new String[]{"4", "5", "6"}, "male"));

        };
    }
    @Bean
    CommandLineRunner commandLineRunnerVHTs(VHTsRepository vhtsRepository) {
        return strings -> {
            String hashedPassword = passwordEncoder.encode("password");

            vhtsRepository.save(new VHTs("115", "Bilbo Baggins", new String[]{"id of patient 1", "id of patient 2"}, new String[]{"id of assessment 1", "id of assessment2"}));
            vhtsRepository.save(new VHTs("54", "Gregor the Overlander", new String[]{"id of patient 1"}, new String[]{"id of assessment 1", "id of assessment 2", "id of assessment 3"}));
            vhtsRepository.save(new VHTs("777", "Brian Marwood", new String[]{"1"}, new String[]{"4", "5", "6"}));

        };
    }
    @Bean
    CommandLineRunner commandLineRunnerCHOs(CHOsRepository chosRepository) {
        return strings -> {
            String hashedPassword = passwordEncoder.encode("password");

            chosRepository.save(new CHOs("1105", "Bilbo Baggins", new String[]{"id of vht 1"},new String[]{"id of patient 1"}, new String[]{"id of assessment 1"}));
            chosRepository.save(new CHOs("540", "Gregor the Overlander", new String[]{"id of vht 1", "id of vht 2"},new String[]{"id of patient 1"}, new String[]{"id of assessment 1", "id of assessment 2", "id of assessment 3"}));
            chosRepository.save(new CHOs("1234", "Bill Gates", new String[]{"777"},null, null));

        };
    }


}
