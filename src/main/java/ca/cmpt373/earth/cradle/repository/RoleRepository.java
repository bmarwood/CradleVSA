package ca.cmpt373.earth.cradle.repository;

import ca.cmpt373.earth.cradle.Models.Role;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface RoleRepository extends MongoRepository<Role, String> {

    Role findByRole(String role);

    @Query(value = "{'id': ?0}", fields = "{'role' : 0}")
    List findRoleByUserID(String id);
}
