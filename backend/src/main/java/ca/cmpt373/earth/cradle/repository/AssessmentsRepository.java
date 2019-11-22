package ca.cmpt373.earth.cradle.repository;

import ca.cmpt373.earth.cradle.Models.Assessments;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;


//Define Assessments repository
public interface AssessmentsRepository extends MongoRepository<Assessments, String> {

    Assessments findFirstById(String id);

    @Query("{address: '?0'}")
    List<Assessments> findCustomByAddress(String address);

    @Query("{address: {$regex: ?0 } }")
    List<Assessments> findCustomByRegExAddress(String domain);

    @Query("{id: '?0'}")
    Assessments findCustomById(String id);

    @Query("{cvsa_id: '?0'}")
    List<Assessments> findByCVSAId(String cvsa_id);

    @Query("{patient_id: '?0'}")
    List<Assessments> findByPatientId(String patient_id);

<<<<<<< HEAD
    @Query("{date: '?0'}")
    List<Assessments> findByDate(String date);
=======
    @Query("{location: '?0'}")
    List<Assessments> findByLocation(String location);


>>>>>>> 4a28ba40c1b2d6ae62ee29f5858e3a05d0ecb823
}

