package ca.cmpt373.earth.cradle.repository;

import ca.cmpt373.earth.cradle.document.Patient;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import java.util.List;

public interface PatientRepository extends MongoRepository<Patient,String > {
    Patient findFirstByName(String name);

    @Query("{address: '?0'}")
    List<Patient> findCustomByAddress(String address);

    @Query("{address: {$regex: ?0 } }")
    List<Patient> findCustomByRegExAdress(String domain);
}
