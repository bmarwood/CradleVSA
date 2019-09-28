package ca.cmpt373.earth.cradle.repository;

import ca.cmpt373.earth.cradle.Models.Patients;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;


//Define patient repository
public interface PatientsRepository extends MongoRepository<Patients,String> {

    Patients findFirstByName(String name);

    @Query("{address: '?0'}")
    List<Patients> findCustomByAddress(String address);

    @Query("{address: {$regex: ?0 } }")
    List<Patients> findCustomByRegExAddress(String domain);

}

