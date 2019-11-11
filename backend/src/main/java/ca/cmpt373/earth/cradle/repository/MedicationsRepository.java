package ca.cmpt373.earth.cradle.repository;

import ca.cmpt373.earth.cradle.Models.Medications;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface MedicationsRepository extends MongoRepository<Medications, String> {

    Medications findByID(String id);

    @Query("{id: '?0'}")
    Medications findCustomById(String id);
    
    @Query("{patient_id: '?0'}")
    List<Medications> findByPatientId(String patient_id);
}

