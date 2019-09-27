package ca.cmpt373.earth.cradle.repository;

import ca.cmpt373.earth.cradle.Models.VHTs;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;


//Define VHT repository
public interface VHTsRepository extends MongoRepository<VHTs,String> {

    VHTs findFirstByName(String name);

    @Query("{address: '?0'}")
    List<VHTs> findCustomByAddress(String address);

    @Query("{address: {$regex: ?0 } }")
    List<VHTs> findCustomByRegExAddress(String domain);

}

