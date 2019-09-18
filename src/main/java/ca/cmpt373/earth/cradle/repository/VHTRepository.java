package ca.cmpt373.earth.cradle.repository;

import ca.cmpt373.earth.cradle.document.VHT;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface VHTRepository extends MongoRepository<VHT,String > {
    VHT findFirstByName(String name);

    @Query("{address: '?0'}")
    List<VHT> findCustomByAddress(String address);

    @Query("{address: {$regex: ?0 } }")
    List<VHT> findCustomByRegExAdress(String domain);
}
