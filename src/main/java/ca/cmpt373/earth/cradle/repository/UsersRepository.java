package ca.cmpt373.earth.cradle.repository;

import ca.cmpt373.earth.cradle.Models.Users;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;


//Define user repository
public interface UsersRepository extends MongoRepository<Users,String > {

    Users findFirstByName(String name);

    @Query("{address: '?0'}")
    List<Users> findCustomByAddress(String address);

    @Query("{address: {$regex: ?0 } }")
    List<Users> findCustomByRegExAdress(String domain);

}

