package ca.cmpt373.earth.cradle.repository;

import ca.cmpt373.earth.cradle.Models.Admin;
import ca.cmpt373.earth.cradle.Models.Users;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface AdminRepository extends MongoRepository<Admin, String> {

    @Query("{id: '?0'}")
    Users findAdminById(String id);

    @Query("{address: '?0'}")
    List<Users> findAdminByAddress(String address);

    @Query("{address: {$regex: ?0 } }")
    List<Users> findAdminByRegExAddress(String domain);

}
