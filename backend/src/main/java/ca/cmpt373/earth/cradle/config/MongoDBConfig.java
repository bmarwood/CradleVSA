package ca.cmpt373.earth.cradle.config;

import ca.cmpt373.earth.cradle.Models.Role;
import ca.cmpt373.earth.cradle.Models.Users;
import ca.cmpt373.earth.cradle.repository.RoleRepository;
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

import java.util.HashSet;
import java.util.Set;

@EnableMongoRepositories(basePackageClasses = UsersRepository.class)

@Configuration
public class MongoDBConfig {
/*
    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Bean
    CommandLineRunner commandLineRunner(UsersRepository usersRepository) {
        return strings -> {
            String hashedPassword = passwordEncoder.encode("password");

            Set<Role> roles = new HashSet<>();
            Role newAdminRole = new Role("3920101", "ADMIN");
            roles.add(newAdminRole);
            Set<Role> roles2 = new HashSet<>();
            Role newUserRole = new Role("382828", "USER");            roles2.add(newUserRole);

            Role newHealthWorkerRole = new Role("3920101", "HEALTHWORKER");
            roles.add(newHealthWorkerRole);

            usersRepository.save(new Users("3920101", "admin", hashedPassword, "Admin", "02/02/2002",
                    "8888 University Drive, Burnaby V3J 7H5", "MALE", roles));
            usersRepository.save(new Users("382828", "user", hashedPassword, "User", "12/02/1992",
                    "8888 University Drive, Burnaby V3J 7H5", "FEMALE", roles2));

//            usersRepository.save(new Users("3920101", "admin", hashedPassword, "Admin", "October 19, 2009",
//                    "8888 University Drive, Burnaby V3J 7H5", Users.Gender.MALE, roles));
//            usersRepository.save(new Users("382828", "user", hashedPassword, "User", "December 02, 1992",
//                    "8888 University Drive, Burnaby V3J 7H5", Users.Gender.FEMALE, roles2));


        };
    }

    @Bean
    CommandLineRunner commandLineRunnerAssess(AssessmentsRepository assessmentsRepository) {
        return strings -> {

            String[] symptoms = {"cough", "sings well"};
            assessmentsRepository.save(new Assessments("1", "22", "34", "ab11", "sept 24", "2", 72, 68, 44, Assessments.Color.GREEN,
                    symptoms, true, true, "next week monday", true, Assessments.Arrow.EMPTY, Assessments.Gestational_unit.WEEK));
            assessmentsRepository.save(new Assessments("2", "44", "10", "ab11", "sept 25", "4", 44, 90, 10, Assessments.Color.RED,
                    symptoms, true, true, "next week tuesday", true, Assessments.Arrow.UP, Assessments.Gestational_unit.WEEK));
            assessmentsRepository.save(new Assessments("4", "1", "44", "777", "sept 24, 2019", "6", 80, 105, 70, Assessments.Color.RED,
                    symptoms, true, true, "next week tuesday", true, Assessments.Arrow.DOWN, Assessments.Gestational_unit.WEEK));
            assessmentsRepository.save(new Assessments("5", "1", "44", "777", "sept 24, 2019", "7", 82, 110, 80, Assessments.Color.YELLOW,
                    symptoms, true, true, "next week tuesday", false, Assessments.Arrow.UP, Assessments.Gestational_unit.WEEK));
            assessmentsRepository.save(new Assessments("6", "1", "44", "777", "sept 26, 2019", "8", 74, 127, 84, Assessments.Color.GREEN,
                    symptoms, true, false, null, false, Assessments.Arrow.EMPTY, Assessments.Gestational_unit.WEEK));
        };
    }

    @Bean
    CommandLineRunner commandLineRunnerPatients(PatientsRepository patientsRepository) {
        return strings -> {
            String hashedPassword = passwordEncoder.encode("password");
            Set<Assessments> assessment = new HashSet<>();

            patientsRepository.save(new Patients("36", "Peter Parker", "April 31, 1996", assessment, "female"));
            patientsRepository.save(new Patients("5", "Sam Smith", "December 16, 1960", assessment, "male"));
            patientsRepository.save(new Patients("1", "Michael Bublé", "September 9, 1975", assessment, "male"));

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

            chosRepository.save(new CHOs("1105", "Bilbo Baggins", new String[]{"id of vht 1"}, new String[]{"id of patient 1"}, new String[]{"id of assessment 1"}));
            chosRepository.save(new CHOs("540", "Gregor the Overlander", new String[]{"id of vht 1", "id of vht 2"}, new String[]{"id of patient 1"}, new String[]{"id of assessment 1", "id of assessment 2", "id of assessment 3"}));
            chosRepository.save(new CHOs("1234", "Bill Gates", new String[]{"777"}, null, null));

        };
    }

    @Bean
    CommandLineRunner commandLineRunnerRole(RoleRepository roleRepository) {
        return strings -> {
            Role newAdminRole = new Role("3920101", "ADMIN");
            roleRepository.save(newAdminRole);
            Role newUserRole = new Role("382828", "USER");
            roleRepository.save(newUserRole);
            Role newHealthWorkerRole = new Role("3920101", "HEALTHWORKER");
            roleRepository.save(newHealthWorkerRole);
        };
    }

    */
}
