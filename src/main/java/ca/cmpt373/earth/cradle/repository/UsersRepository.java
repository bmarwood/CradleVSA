package ca.cmpt373.earth.cradle.repository;

import ca.cmpt373.earth.cradle.Models.Users;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface UsersRepository extends MongoRepository<Users,String> {

    Users findByUsername(String username);


    //Users findById(String id);

    @Query("{address: '?0'}")
    List<Users> findCustomByAddress(String address);

    @Query("{address: {$regex: ?0 } }")
    List<Users> findCustomByRegExAdress(String domain);

}

