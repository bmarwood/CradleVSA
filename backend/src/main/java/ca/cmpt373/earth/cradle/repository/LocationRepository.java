package ca.cmpt373.earth.cradle.repository;

import ca.cmpt373.earth.cradle.Models.Location;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import java.util.List;

public interface LocationRepository extends MongoRepository<Location, String> {

    public Location findByName(String name);

    @Query(value = "{'id': ?0}", fields = "{'location' : 0}")
    public List findLocationByLocationId(String id);


}