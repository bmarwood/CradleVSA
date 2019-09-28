package ca.cmpt373.earth.cradle.repository;

import ca.cmpt373.earth.cradle.Models.CHOs;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;


//Define Community Health Officer repository
public interface CHOsRepository extends MongoRepository<CHOs,String> {

    CHOs findFirstByName(String name);

    @Query("{address: '?0'}")
    List<CHOs> findCustomByAddress(String address);

    @Query("{address: {$regex: ?0 } }")
    List<CHOs> findCustomByRegExAddress(String domain);

}

